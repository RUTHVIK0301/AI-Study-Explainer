import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/@vite/client") {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/@vite/client"],
};

