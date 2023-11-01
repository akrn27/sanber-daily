import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, Button, Card, Dropdown, DropdownItem } from "flowbite-react";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [myPosts, setMyPosts] = useState([]);

  const getMe = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
        config
      );
      //   console.log(response);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setDob(response.data.data.dob);
      setId(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const getMyPosts = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all`,
        config
      );
        console.log(response.data.data)
      setMyPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyPosts();
  }, []);

  const deletePost = async (idData) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(idData)
      await axios.delete(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${idData}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Card>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Avatar
            display
            Name
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src="/images/people/profile-picture-3.jpg"
            width="96"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>
        <div>
          <p>Email: {email}</p>
          <p>Date of Birth: {dob}</p>
        </div>
      </Card>

      <ul>
        <Card>
          <div className="flex flex-col items-center pb-10">
            {myPosts &&
              myPosts
                .filter((res) => {
                  return res.user.id === id;
                })
                .map((filteredPost) => (
                  <div className="w-full shadow-sm my-2">
                    <div className="flex gap-8 w-full mt-6">
                      <Avatar
                        alt="Bonnie image"
                        className="mb-3 rounded-full shadow-lg"
                        height="96"
                        src="/images/people/profile-picture-3.jpg"
                        width="96"
                      />
                      <div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {filteredPost.user.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {filteredPost.user.email} - 
                          ({new Date(filteredPost.created_at).toLocaleDateString("en-US")})
                        </span>
                        <p>
                            
                        </p>
                      </div>
                    </div>
                    <p className="my-4 w-full">{filteredPost.description}</p>

                    <div className="flex space-x-3 lg:mt-6 mb-8">
                      <a
                        className="inline-flex items-center rounded-lg border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        href="#"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"
                            />
                          </svg>
                          <span>{filteredPost.likes_count} Like</span>
                        </div>
                      </a>
                      <a
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        href="#"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                            />
                          </svg>
                          <span>{filteredPost.replies_count} Replies</span>
                        </div>
                      </a>
                    </div>
                    <div className="flex gap-3 w-full">
                      <Button className="w-full">Edit</Button>
                      <Button
                        onClick={(e) => deletePost(e.target.value)}
                        value={filteredPost.id}
                        color="failure"
                        className="w-full"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </Card>
      </ul>
    </Layout>
  );
};

export default Profile;
