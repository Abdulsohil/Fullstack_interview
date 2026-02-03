// require("bcryptjs").hashSync("Admin@123", 10);
const bcrypt = require("bcryptjs");

const password = "admin1@123";
const pass = async () => {
  const hash = await bcrypt.hashSync("Admin@123", 10);
  console.log(hash);
};

pass();

const bcrypt = require("bcryptjs");
bcrypt.hash("Admin@123", 10).then(console.log);
