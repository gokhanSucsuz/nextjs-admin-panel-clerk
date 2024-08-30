import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex flex-col  justify-between p-8">
			<SignedIn>
				<UserButton signInUrl="/" />
			</SignedIn>
		</main>
	);
}
