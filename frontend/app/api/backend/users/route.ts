import { NextRequest, NextResponse } from "next/server"; 
import { backendUrl } from "@/utils/constants";

export async function GET(request: NextRequest) {
  try {
	const cookie = request.headers.get("cookie");
 
	const response = await fetch(`${backendUrl}/api/users`, {
	 	method: "GET", 
	      headers: {
	         ...(cookie && { Cookie: cookie }), 
	        Accept: "application/json",
	      },
	       cache: "no-store",
	     });

    if (!response.ok)  {
		let errorMessage = "Failed to fetch users";
		
		try{
			errorMessage = await response.text();
		} catch (_) {}
		
		return NextResponse.json(
		       { error: errorMessage },
		       { status: response.status }
		     );
    }

	const data = await response.json();
	    return NextResponse.json(data, { status: 200 }); 
	
	  } catch (error) {
	     console.error("Error fetching users:", error);
	
	     return NextResponse.json(
	       { error: "Internal server error" }, 
	     );
	  }
}

