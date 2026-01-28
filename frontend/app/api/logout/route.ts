import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/utils/constants";

export async function POST(request: NextRequest) {
  try {
	const body = await request.json();
	const cookie = request.headers.get("cookie");
	
	const response = await fetch(`${backendUrl}/api/sales`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(cookie && { Cookie: cookie }),
			},
			credentials: "include",
			body: JSON.stringify(body),
		});
			
		if (!response.ok) {
		      let errorMessage = "Failed to process sale"; // 🔹 [MUUDATUS 4]
	
		      try {
		        errorMessage = await response.text();
		       } catch (_) {}
		
		      return NextResponse.json(
	            { error: errorMessage },
		        { status: response.status }
		      );
		    }	
			
			const data = await response.json();
			return NextResponse.json(data, { status: 201 });
			
			} catch (error) {
				console.error("Proxy error:", error);
				
				return NextResponse.json(
					{ error: "Internal server error" }, 
					{ status: 500 }
				);
			}
		}