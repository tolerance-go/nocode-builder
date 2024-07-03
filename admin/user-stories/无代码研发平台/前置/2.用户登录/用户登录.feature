Feature: 用户登录

    Scenario: 用户成功登录
        Given 用户在登录页面
        When 用户输入用户名 "testuser"
            And 用户输入密码 "password123"
            And 用户点击登录按钮
        Then 系统验证用户名和密码的正确性
            And 用户登录成功
            And 重定向到仪表盘页面

    Scenario: 用户名错误
        Given 用户在登录页面
        When 用户输入用户名 "wronguser"
            And 用户输入密码 "password123"
            And 用户点击登录按钮
        Then 系统验证用户名和密码的正确性
            And 显示错误消息 "用户名或密码不正确"

    Scenario: 密码错误
        Given 用户在登录页面
        When 用户输入用户名 "testuser"
            And 用户输入密码 "wrongpassword"
            And 用户点击登录按钮
        Then 系统验证用户名和密码的正确性
            And 显示错误消息 "用户名或密码不正确"

    Scenario: 用户名和密码均错误
        Given 用户在登录页面
        When 用户输入用户名 "wronguser"
            And 用户输入密码 "wrongpassword"
            And 用户点击登录按钮
        Then 系统验证用户名和密码的正确性
            And 显示错误消息 "用户名或密码不正确"
