import AllNewsCategory from "@/components/shared/AllNewsCategory";
import MainNewsSection from "@/components/shared/MainNewsSection";

export default async function CategoryPage({ params }) {
  // MUST await params in Next.js 15
  const { id } = await params;

  return (
    <main className="container mx-auto my-6 px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-3">
          <AllNewsCategory activeId={id} />
        </aside>

        {/* Middle Content */}
        <section className="col-span-6">
          <MainNewsSection categoryId={id} />
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-3">
          <h2 className="font-bold text-xl mb-4">Login With</h2>
          {/* Add your Right Sidebar content here */}
        </aside>
      </div>
    </main>
  );
}
