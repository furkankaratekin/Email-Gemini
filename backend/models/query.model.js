import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    firstprompt: {
      type: String,
    },
    secondprompt: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

export default Query;
