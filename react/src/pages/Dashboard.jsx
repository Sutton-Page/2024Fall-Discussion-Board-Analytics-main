import "../styles/App.css";
import Dash from "../components/Dash";

function Dashboard() {
  var letters = ["Sutton", "b", "c"];

  const metrics = {
    mostRepliedPost: {
      name: "John Doe",
      postId: 5,
      replies: 10,
      profilePic:
        "https://i5.walmartimages.com/asr/23b7de79-cfc6-4764-a720-957aa667ec76.1708f37e94750898290d92adf357f112.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    },
    mostViewedPost: {
      name: "Jane Smith",
      postId: 3,
      views: 25,
      profilePic:
        "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    },
    avgWordCount: 120,
    sentiment: { positive: 50, negative: 33.3, neutral: 16.7 },
    interactions: [
      { postId: 0, interactions: 8, user: "Benjamin Roberts" },
      { postId: 1, interactions: 5, user: "Brantley NeSmith" },
      { postId: 2, interactions: 9, user: "Ryan Florin" },
      { postId: 3, interactions: 12, user: "Sutton Page" },
      { postId: 4, interactions: 2, user: "Broderick Hammond" },
      { postId: 5, interactions: 5, user: "Jaadin Neptune" },
    ],
    views: [
      { name: "Benjamin Roberts", views: 9 },
      { name: "Bob Martinez", views: 15 },
      { name: "Ryan Florin", views: 9 },
      { name: "Sutton Page", views: 13 },
      { name: "Broderick Hammond", views: 11 },
      { name: "Jaadin Neptune", views: 12 },
    ],
  };

  return (
    <div>
      <Dash metrics={metrics}></Dash>
    </div>
  );
}
export default Dashboard;
