import { Github, Globe, Linkedin } from "lucide-react";
import CustomNavBar from "../../components/CustomNavBar";
import Footer from "../../components/Footer";
import { Link } from "@nextui-org/react";

const About = () => {
  return (
    <>
      <CustomNavBar />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[1024px] w-full flex flex-col items-center justify-between px-6 my-6 gap-8 text-center">
          <h1>
            👋🏼 Hi! I am Sibil Sarjam Soren, A passionate Full Stack Developer
          </h1>
          <h2 className="flex gap-5 items-center">
            Lets connect on
            <div className="flex flex-row gap-5">
              <Link href="https://www.linkedin.com/in/sibilsarjamsoren/">
                <Linkedin />
              </Link>{" "}
              <Link href="https://github.com/SibilSoren">
                <Github />
              </Link>
            </div>
          </h2>
          <h2 className="flex items-center gap-4">
            Visit my Portfolio{" "}
            <Link href="https://sibildev.in.net/">
              {" "}
              <Globe />
            </Link>{" "}
          </h2>
        </div>
      </div>
      <div className="absolute bottom-0 w-full mb-5">
        <Footer />
      </div>
    </>
  );
};

export default About;
