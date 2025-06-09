import BlogList from "./_components/BlogList";
import Faq from "./_components/FAQ";
import Hero from "./_components/Hero";
import KeyFeatures from "./_components/KeyFeatures";

const HomePage = () => {
  return (
    <main className="md:px-16 px-4 md:pt-10 pt-5">
      <Hero />
      <BlogList />
      <KeyFeatures />
      <Faq />
    </main>
  );
};

export default HomePage;
