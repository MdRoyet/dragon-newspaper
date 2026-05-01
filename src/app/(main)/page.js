import { redirect } from "next/navigation";

export default function Home() {
  // Redirect users to the first category automatically
  redirect("/category/01");
}
