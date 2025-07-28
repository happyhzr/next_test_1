import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUP_QUERY)
  console.log(posts);
  // const posts = [
  //   {
  //     _createAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: 'happyhzr' },
  //     _id: 1,
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //     title: 'Startup 1',
  //     image: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     category: 'Technology',
  //   }
  // ]

  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Welcome to the Startup Hub
        </h1>
        <p className="sub-heading !max-w-3xl">
          Discover innovative startups and explore their unique offerings. Use the search bar to find specific startups or browse through our collection.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {
            query ? ' Search Results for: ' + query : 'All Startups'
          }
        </p>
        <ul className="mt-7 card_grid">
          {
            posts?.length > 0 ? (
              posts.map((post: any) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (<p className="no-results">No startups found</p>)
          }
        </ul>
      </section>
    </div>
  );
}
