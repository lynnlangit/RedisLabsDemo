CREATE TABLE [redis-labs-demo].dbo.user_status (
  user_id INT NOT NULL,
  user_status NVARCHAR NOT NULL,
  created_date DATETIME2 DEFAULT (getutcdate()) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_login (user_id)
);
CREATE INDEX user_status_user_id_index ON user_status (user_id);