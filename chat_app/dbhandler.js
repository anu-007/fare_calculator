const mysql=require('mysql');

let connection = {};
const createConnection = function () {
    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'chatuser',
            database : 'chatdb'
        }
    );
    return connection;
};

module.exports={
fetchmsg: function (cb) {
     const conn = createConnection();
     conn.connect();
     let chatarray = [];
     conn.query('SELECT * FROM chats ORDER BY time ASC',
     function (err, rows, fields) {
         for (let row of rows) {
             chatarray.push({
                 id:row.id,
                 user: row.user,
                 msg: row.msg,
                 time: row.time
             })
         }
         cb(chatarray);
     });

     conn.end();
 },

 addchat: function ( chat, cb ) {
     const conn = createConnection();
     conn.connect();
     const queryString = "INSERT INTO chats VALUES('"+chat.id+"','" +
             chat.user + "', '" + chat.msg + "', " +
             chat.time +
             ");";
     conn.query(queryString, function (err, result) {
    console.log(result);
       if(err)
       console.log(err);
         cb(result);
     });
     conn.end();
 }
 }
