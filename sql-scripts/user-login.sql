CREATE TABLE [redis-labs-demo].dbo.user_login (
  user_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  user_email NVARCHAR(50) NOT NULL,
  user_password NVARCHAR(50) NOT NULL,
  user_name NVARCHAR(50) NOT NULL
);
CREATE UNIQUE INDEX user_login_user_email_uindex ON user_login (user_email);