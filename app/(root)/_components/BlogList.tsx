import { ArrowRight } from "lucide-react";
import Link from "next/link";

const BlogList = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 pt-20 pb-5">
      <Link
        href={`/blog/123`}
        className="flex flex-col gap-2 border p-4 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-muted-foreground">NEWS</h4>
          <ArrowRight className="text-colprimary" />
        </div>
        <p className="">Global Collaboration Leads to Successful Vaccine</p>
      </Link>
      <Link
        href={`/blog/123`}
        className="flex flex-col gap-2 border p-4 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-muted-foreground">NEWS</h4>
          <ArrowRight className="text-colprimary" />
        </div>
        <p className="">Global Collaboration Leads to Successful Vaccine</p>
      </Link>
      <Link
        href={`/blog/123`}
        className="flex flex-col gap-2 border p-4 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-muted-foreground">NEWS</h4>
          <ArrowRight className="text-colprimary" />
        </div>
        <p className="">Global Collaboration Leads to Successful Vaccine</p>
      </Link>
      <Link
        href={`/blog/123`}
        className="flex flex-col gap-2 border p-4 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-muted-foreground">NEWS</h4>
          <ArrowRight className="text-colprimary" />
        </div>
        <p className="">Global Collaboration Leads to Successful Vaccine</p>
      </Link>
    </div>
  );
};

export default BlogList;
