import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(200),
  organizationName: z.string().min(1).max(100),
});

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, password, organizationName } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Generic message — don't reveal whether the email exists.
    return NextResponse.json(
      { error: "Could not create account with those details" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const baseSlug = slugify(organizationName) || "org";
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: { name, email, passwordHash },
    });
    const org = await tx.organization.create({
      data: { name: organizationName, slug },
    });
    await tx.organizationMember.create({
      data: { userId: createdUser.id, organizationId: org.id, role: "OWNER" },
    });
    return createdUser;
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
