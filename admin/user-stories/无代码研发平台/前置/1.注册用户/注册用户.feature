Feature: 注册用户
    Scenario: 成功注册
        Given 我在注册页面
        When 我输入有效的用户名、密码和邮箱
            And 我点击“注册”按钮
        Then 我应该看到“注册成功”的消息
            And 我应该收到一封验证邮件

    Scenario: 注册时用户名已被占用
        Given 我在注册页面
            And 系统中已有用户使用了用户名“testuser”
        When 我输入用户名“testuser”、有效的密码和邮箱
            And 我点击“注册”按钮
        Then 我应该看到“用户名已被占用”的错误消息

    Scenario: 注册时邮箱格式无效
        Given 我在注册页面
        When 我输入有效的用户名和密码，但邮箱格式无效
            And 我点击“注册”按钮
        Then 我应该看到“邮箱格式无效”的错误消息
