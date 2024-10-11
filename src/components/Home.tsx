import React, { useEffect, useState } from "react";
import useAxios from "../AxiosInstance";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface User {
  avatar: string;
  email: string;
  password: string;
  name: string;
  description: string;
}

interface CustomCarouselProps {
  userlist: User[];
}

const Home: React.FC = () => {
  const axiosInstance = useAxios();
  const [userlist, setUsers] = useState<User[]>([]);

  // Fetch only user data without authentication
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await axiosInstance.get("users");
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []); // Fetch once when component mounts

  return (
    <div>
      <MemoizedCardProfile userlist={userlist} />
    </div>
  );
};

// Memoize CardProfile to optimize performance
const CardProfile: React.FC<CustomCarouselProps> = ({ userlist }) => {
  return (
    <div className="row">
      <div className="col-12">
        <CustomCarousel userlist={userlist} />
      </div>
    </div>
  );
};
const MemoizedCardProfile = React.memo(CardProfile);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Memoize CustomCarousel for performance
const CustomCarousel: React.FC<CustomCarouselProps> = React.memo(
  ({ userlist }) => {
    return (
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between border-bottom align-items-center my-4">
            <h3 className=" text-success  fw-bold">List of Users</h3>
            <h6 className="my-4 text-danger pb-2 fw-bold fst-italic border-bottom">
              For Login Use This User Email and Password
            </h6>
          </div>
          <Carousel responsive={responsive}>
            {userlist.map((user, index) => (
              <div className="card" key={index}>
                <img src={user.avatar} className="card-img-top" alt="Profile" />
                <div className="card-body">
                  <div>
                    <h6>
                      <span className="text-danger"> Email:</span> {user.email}
                    </h6>
                    <h6>
                      <span className="text-info">Password:</span>{" "}
                      {user.password}
                    </h6>
                  </div>
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.description}</p>
                  <a href="#" className="btn btn-primary">
                    Know More
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
);

export default Home;
