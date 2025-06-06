import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-xl font-bold">Thank you for your purchase 🔥</h1>
      <Link href="/dashboard" className="btn btn-primary mt-4">
        Dashboard
      </Link>
    </main>
  );
}
