import mongoose from "mongoose";

const linkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String }, // optional: for social icons
    order: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", linkSchema);
export default Link;
