import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  image: {
    thumbnail: {
      type: String,
      default: "https://i.ibb.co/bRb0SYw/chat-placeholder.png",
    },
    original: {
      type: String,
      default: "https://i.ibb.co/FqHrScZ/chat-placeholder.png",
    },
  },
  description: {
    type: String,
    default: "",
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: {
        type: String,
        default: "message",
        enum: ["notification", "message", "singleEmoji"],
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      image: {
        thumbnail: {
          type: String,
          default: "",
        },
        original: {
          type: String,
          default: "",
        },
      },
      content: {
        type: String,
        required: true,
        minlength: 1,
      },
      isReadBy: [
        {
          member: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          isRead: {
            type: Boolean,
            default: false,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.methods.displayChatTitle = function (currentUserId) {
  if (this.isGroupChat) {
    return this.title;
  }
  const findTheOthersParticipantsName = this.participants.find(
    (participant) => participant.id !== currentUserId
  ).name;
  return findTheOthersParticipantsName;
};

chatSchema.methods.displayChatImage = function (currentUserId) {
  if (this.isGroupChat) {
    return this.image;
  }
  const findTheOthersParticipantsProfileImage = this.participants.find(
    (participant) => participant.id !== currentUserId
  ).image;
  return findTheOthersParticipantsProfileImage;
};

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
