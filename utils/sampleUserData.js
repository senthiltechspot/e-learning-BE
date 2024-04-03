import bcrpyt from "bcrypt";

export const sampleUserData = {
  admin: {
    name: "senthil",
    email: "senthilm784@gmail.com",
    password: bcrpyt.hashSync("qwerty123", 10),
    role: "admin",
  },
  user: {
    name: "senthil",
    email: "senthil@gmail.com",
    password: bcrpyt.hashSync("qwerty123", 10),
    role: "user",
  },
};

export const sampleCourses = [
  {
    title: "'Introduction to Web Development'",
    category: "Programming",
    level: "Beginner",
    description:
      "Learn the basics of web development using HTML, CSS, and JavaScript.",
    imgURL: "https://example.com/webdev.jpg",
    rating: 4.5,
  },
  {
    title: "'Data Structures and Algorithms'",
    category: "Programming",
    level: "Intermediate",
    description:
      "Explore the fundamental concepts of data structures and algorithms.",
    imgURL: "https://example.com/datastructures.jpg",
    rating: 4.8,
  },
  {
    title: "'Artificial Intelligence'",
    category: "Programming",
    level: "Advanced",
    description:
      "Explore the principles of artificial intelligence and machine learning.",
    imgURL: "https://example.com/artificialintelligence.jpg",
    rating: 4.2,
  },
  {
    title: "'Database Management Systems'",
    category: "Programming",
    level: "Beginner",
    description:
      "Learn the basics of database management systems using SQL and NoSQL.",
    imgURL: "https://example.com/databases.jpg",
    rating: 4.7,
  },
];
