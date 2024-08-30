import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const categories = await prisma.category.findMany();
		return NextResponse.json(categories, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed" }, { status: 500 });
	}
}
