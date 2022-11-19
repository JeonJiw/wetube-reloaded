import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  /* mongoose 6.x 인 경우 아래 값 설정할 필요 없음
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, */
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
