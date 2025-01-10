```
Message.find()
  .populate("senderId")  // Populates the senderId field with the full User data
  .populate("receiverId")  // Populates the receiverId field with the full User data
  .exec((err, messages) => {
    if (err) {
      console.error(err);
    } else {
      console.log(messages);
    }
  });
```

Summary:
mongoose.Schema.Types.ObjectId is used to define a field that references an ObjectId from another collection in MongoDB.
The ref option specifies the name of the collection (in this case, "User") that the ObjectId refers to.
You can use populate() to replace the ObjectId with the actual document data from the referenced collection when querying.

#### User db

`const user = await User.findById(decoded.userId).select("-password");`

User.findById(decoded.userId):
User.findById() is a Mongoose method used to find a document in the User collection by its \_id. The decoded.userId is the userId that was encoded in the JWT token when it was generated (i.e., it's the user identifier you attached to the payload).
The decoded object comes from verifying the JWT token using jwt.verify(). It will contain the userId that was set when generating the token in the generateTokenAndSetCookie function.
.select("-password"):
This is a Mongoose query option that specifies which fields to include or exclude from the resulting document.
"-password" tells Mongoose to exclude the password field from the result.
This is done for security reasons because you don't want to return the user's password in the response. You can use .select("-password") to avoid sending the password back in the response.
