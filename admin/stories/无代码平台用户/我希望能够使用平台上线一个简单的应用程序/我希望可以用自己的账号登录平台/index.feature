Feature: 用户输入用户名

    Scenario: 用户可以在注册页面找到用户名输入框
        Given 用户在注册页面
        Then 用户看到用户名输入框

    Scenario: 用户可以在用户名输入框中输入用户名
        Given 用户在注册页面
        When 用户在用户名输入框中输入 "newuser"
        Then 用户名输入框中显示 "newuser"

    Scenario: 用户名有效性验证 - 用户名已存在
        Given 用户在注册页面
        When 用户在用户名输入框中输入 "existinguser"
            And 用户点击注册按钮
        Then 系统验证用户名的唯一性
            And 显示错误消息 "用户名已被占用"


    Scenario: 用户名不能为空的验证
        Given 用户在注册页面
        When 用户在用户名输入框中输入 ""
            And 用户点击注册按钮
        Then 显示错误消息 "用户名不能为空"

    Scenario: 用户名有效性验证 - 用户名有效
        Given 用户在注册页面
        When 用户在用户名输入框中输入 "newuniqueuser"
            And 用户点击注册按钮
        Then 系统验证用户名的长度
            And 系统验证用户名的唯一性
            And 用户名通过验证
            And 系统继续注册流程