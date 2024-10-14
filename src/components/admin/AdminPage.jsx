import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const AdminPage = () => {
  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          My Admin
        </h3>
        <div className="flex flex-col gap-8 h-full">
          <div className="bg-tertiary py-8 px-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                Rooms
              </h3>

              <Button size="md"><Link to="/admin/manage-rooms">Manage Rooms</Link></Button>
            </div>
          </div>
          <div className="bg-tertiary py-8 px-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                Bookings
              </h3>

              <Button size="md"><Link to="/admin/manage-bookings">Manage Bookings</Link></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
