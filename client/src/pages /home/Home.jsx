import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useAuth();
  return (
    <section className=" overflow-x-hidden px-2">
      <div className="container  mx-auto ">
        <div >
          <h1 className="text-center text-white text-4xl pt-30 md:pt-30">
            Quick.Clean.Delivered.
          </h1>
          <p className="text-center mx-auto  text-white mt-3 w-[340px] md:w-[640px] ">
            Laundry Wash helps you save time with fast, reliable pickup and
            delivery service. Because you deserve clean clothes without the wait.
          </p>
        </div>
        <div className=" text-center space-x-3 mt-8">
          <Link
            to="/book-laundry"
            className="text-white border rounded-3xl bg-(--purple) px-9   py-2 border-(--purple)" 
          >
            Book Laundry
          </Link>
          {!user && (
            <Link
              to="/auth/login"
              className="text-(--purple) border  rounded-3xl border-(--purple)  px-10   py-2 "
            >
              Log In
            </Link>
          )}
        </div>
        <div className="mt-20 px-4 md:px-7 lg:px-0 ">
          <img src="/Frame 30.png" alt="" className="w-full pb-20" />
        </div>
      </div>
      <section className= "bg-[#262626] py-10 px-2">
        <div className="container mx-auto">
          <div className="md:flex  pb-12  md:px-5 lg:px-0 ">
            <div className="w-30  lg:w-30 md:w-60  pb-3  ">
              <h4 className="text-white border-0 text-center rounded-4xl  bg-(--purple)    ">
                Services
              </h4>
            </div>
            <div></div>
            <div className="text-white  md:pl-50 ">
              <h1 className=" text-2xl font-semibold pb-3 md:pb-6">
                Expert Care For Every Fabric
              </h1>
              <p className="text-lg">
                From gentle dry cleaning to precise ironing for everyday wash &
                fold - Obi laundry handles your clothes with the care they
                deserve
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 lg:px-0  md:px-4">
            <div className="col-span-12 md:col-span-4 py-2 bg-[#454545] border-0 rounded-2xl ">
              <img
                src="./image 7.png"
                alt=""
                className=" mx-auto md:w-[400px] pb-4"
              />
              <h1 className="text-white text-xl pb-4 pl-2">Wash & Fold</h1>
              <p className="text-white text-sm  pl-2  ">
                The ultimate time saver. We handle the washing, drying, and
                precise folding of your everyday clothes. They come back fresh,
                clean, and ready to go straight into your drawers.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 py-2 bg-[#454545] border-0 rounded-2xl ">
              <img
                src="./image 8.png"
                alt=""
                className=" mx-auto md:w-[400px] pb-4"
              />
              <h1 className="text-white text-xl pb-4 pl-2">Dry Cleaning</h1>
              <p className="text-white text-sm  pl-2  ">
                Professional dry cleaning that keeps your clothes looking new.
                From delicate silks to sharp suits, every item gets premium
                treatment.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 py-2 bg-[#454545] border-0 rounded-2xl ">
              <img
                src="./image500.png"
                alt=""
                className=" mx-auto md:w-[400px] pb-4"
              />
              <h1 className="text-white text-xl pb-4 pl-2">
                Pickup & Delivery
              </h1>
              <p className="text-white text-sm  pl-2  ">
                Schedule pick-up online; we collect your items, process them
                with care, and deliver them back to your door at your chosen
                time. This service is included with all options below.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-20 md:px-6 lg:px-0">
        <div className="mx-auto flex flex-col justify-center items-center ">
          <div className="w-30  mx-auto pb-3">
            <h4 className="text-white border-0 text-center rounded-4xl  bg-(--purple)    ">
              How It Works
            </h4>
          </div>
          <h1 className=" text-2xl text-center text-white font-semibold pb-3 md:pb-6">
            Expert Care For Every Fabric
          </h1>
          <p className="text-lg text-white text-center lg:w-200">
            From gentle dry cleaning to precise ironing for everyday wash & fold
            - Obi laundry handles your clothes with the care they deserve
          </p>
        </div>
        <div className="md:grid grid-cols-12 gap-12 pt-10 space-y-6">
          <div className="md:col-span-4">
            <img
              src="./calendar-svgrepo-com (2).png"
              alt=""
              className="mx-auto"
            />
            <h1 className="text-white text-xl text-center pb-4 pl-2">
              Schedule Your Service
            </h1>
            <p className="text-white   pl-2  ">
              Use our platform or app to select your service (Wash & Fold, Dry
              Cleaning, etc.) and choose a convenient pick-up and delivery time.
            </p>
          </div>
          <div className="col-span-4">
            <img
              src="./shield-keyhole-minimalistic-svgrepo-com.png"
              alt=""
              className="mx-auto"
            />
            <h1 className="text-white text-xl text-center pb-4 pl-2">
              We Clean & Care
            </h1>
            <p className="text-white   pl-2  ">
              Our team collects your items, pre-treats stains, and cleans your
              garments using professional, eco-friendly methods. Everything is
              carefully folded and packaged.
            </p>
          </div>
          <div className="col-span-4">
            <img
              src="./delivery-svgrepo-com.png"
              alt=""
              className="mx-auto"
            />
            <h1 className="text-white text-xl text-center pb-4 pl-2">
              We Deliver
            </h1>
            <p className="text-white   pl-2  ">
              We deliver your fresh, clean, and neatly packaged laundry right
              back to your door. Laundry done!
            </p>
          </div>
        </div>
        <div className="md:grid grid-cols-12 gap-14 my-16">
          <div className="col-span-6 pt-12 lg:pr-50 ">
            <div className="w-30  pb-3">
              <h4 className="text-white border-0 text-center rounded-4xl  bg-(--purple)  py-2   ">
                Who We Are
              </h4>
            </div>

            <h1 className="text-white text-3xl  pb-4 ">
              Reclaiming Your Time with Professional Laundry Solutions
            </h1>
            <p className="text-white pb-10 ">
              We started Obiwan Laundry with one simple mission: to end the
              endless chore of laundry. We understand that your time is
              valuable, and laundry day shouldn't consume your evenings and
              weekends.
            </p>
          </div>
          <div className="col-span-6">
            <img src="./Rectangle 1.png" alt="" className="w-[500px]" />
          </div>
        </div>
        <div>
          <div>
            <h1 className=" text-2xl text-center  text-white font-semibold pb-3 md:pb-6">
              What Our Customers Say About Us
            </h1>
            <p className="text-lg text-white mx-auto text-center md:w-200">
              Real experiences from people who trust us with their clothes every
              week.
            </p>
          </div>
          <section className="text-white grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 py-15">
            <div className="bg-(--cardBg) reviews rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm bg-(--bgGrey) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="./rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--purple) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="./user_profile.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div className="bg-(--cardBg) reviews rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm bg-(--bgGrey) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="./rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--purple) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="./user_profile.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div className="bg-(--cardBg) reviews rounded-tl-[35px] rounded-tr-[35px] rounded-br-[40px] rounded-bl-[40px] cursor-pointer">
              <div className="p-5 text-sm bg-(--bgGrey) rounded-tr-[30px] rounded-tl-[30px]  rounded-br-[30px]">
                <span className="flex gap-3 pb-3">
                  <img src="./rating.png" alt="" />
                  <span>4/5</span>
                </span>
                <p>
                  The team took time to understand our vision and delivered a
                  sleek, professional site that not only looks great but also
                  improved our conversion rates. Their design process was
                  smooth, communication was clear, and they met all deadlines.
                  We’ve received numerous compliments on the new site, and it’s
                  easier for customers to navigate.
                </p>
              </div>
              <div className="bg-(--purple) rounded-tl-[40px] rounded-br-[40px] rounded-bl-[40px] p-2">
                <span className="p-2">
                  <div className="flex px-2 gap-3">
                    <img src="./user_profile.png" alt="" />
                    <div>
                      <h2 className="text-xl font-medium">Maxin Will</h2>
                      <p className="text-sm">Product Manager</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="bg-[#262626] ">

     
      <section className="md:flex gap-10">
        <div>
          <img src="./Rectangle 10.png" alt=""  className="w-[900px]"/>
        </div>
        <div className="my-auto">
          <div className="lg:mr-70 md:mr-30 mb-8">
            <h1 className="text-white text-3xl lg:text-5xl py-4 md:text-3xl font-semibold">
              Laundry Made Effortless
            </h1>
            <p className="text-white">
              Fresh, clean, perfectly folded—right when you need it.
            </p>
          </div>
          <div className=" flex justify-center ">
            <Link  to="/book-laundry" > <h1 className="text-white border-0 w-90 lg:w-125 md:w-100 text-center rounded-4xl  bg-(--purple) py-4  ">
              Book Laundry
            </h1>
            </Link>
           
          </div>
        </div>
      </section>
      <Footer/>
       </div>
    </section>
  );
}
