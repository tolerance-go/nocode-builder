Feature: 平台用户可以在拼音输入不会影响输入状态

    Scenario: 用户在在主页面
        Given 用户在主页面
        When 用户点击添加菜单分组按钮
            And 用户用中文输入法输入拼音，但是未确认
        Then 输入框不会出现错误状态

Feature: 平台用户可以注册时自动登录

    Scenario: 用户在注册页面看到自动登录选择框
        Given 用户在注册页面
        Then 用户看到自动登录选择框

    Scenario: 自动登录选择框默认勾选
        Given 用户在注册页面
        Then 用户看到自动登录选择框默认是勾选状态

    Scenario: 用户勾选自动登录选项后注册
        Given 用户在注册页面
        When 用户在自动登录选择框中勾选
            And 用户在其他必填项中输入有效信息
            And 用户点击注册按钮
        Then 用户注册成功
            And 系统自动登录该用户
            And 用户进入平台的主界面

    Scenario: 用户未勾选自动登录选项后注册
        Given 用户在注册页面
        When 用户取消勾选自动登录选择框
            And 用户在其他必填项中输入有效信息
            And 用户点击注册按钮
        Then 用户注册成功
            And 系统不会自动登录该用户
            And 用户停留在注册成功提示页面

Feature: 平台用户可以创建应用程序分组

    Scenario: 1-显示“创建分组”按钮
        Given 用户在应用程序管理页面
        When 页面加载完成
        Then 用户应能看到“创建分组”按钮

    Scenario: 2-输入分组名称
        Given 用户点击了“创建分组”按钮
        When 树形结构节点中出现输入框
        Then 用户应能在输入框中输入分组名称

    Scenario: 3-保存分组
        Given 用户在输入框中输入了分组名称
        When 用户点击保存按钮
        Then 系统应保存分组信息
            And 显示分组创建成功消息
            And 关闭输入框

                # Scenario: 4-新创建的分组显示在分组列表中
                #     Given 分组创建成功
                #     When 系统刷新分组列表
                #     Then 新创建的分组应显示在分组列表中

    Scenario: 5-分组名称不能为空
        Given 用户点击了“创建分组”按钮
            And 输入框已出现
        When 用户输入内容后，又全部撤销
        Then 输入框应显示错误状态提示
            And 保持输入框打开


    Scenario: 6-分组名称不能包含无效字符
        Given 用户点击了“创建分组”按钮
            And 输入框已出现
        When 用户输入无效字符
        Then 输入框应显示错误状态提示
            And 保持输入框打开

    Scenario: 7-新建分组名称包含无效字符并按下回车
        Given 用户点击了“创建分组”按钮
            And 输入框已出现
        When 用户输入包含无效字符的分组名称并按下回车键
        Then 输入框应该消失

            # Scenario: 8-保存分组过程中发生网络错误
            #     Given 用户在输入框中输入了有效的分组名称
            #     When 用户点击保存按钮
            #         And 网络连接中断
            #     Then 系统应显示错误消息“网络错误，请稍后重试”
            #         And 保持输入框打开

    Scenario: 9-输入过程中失去焦点且输入内容为空
        Given 用户点击了“创建分组”按钮
            And 树形结构节点中出现输入框
        When 用户在输入框中输入不合法的分组名称
            And 输入过程中失去焦点
        Then 系统应删除该输入框对应的节点

    Scenario: 10-选中文件后创建分组
        Given 用户已选中一个文件
        When 当用户点击添加项目组按钮
        Then 新建分组输入框应显示在同级的最前面

    Scenario: 11-选中文件夹后创建分组
        Given 用户已选中一个文件夹
        When 当用户点击添加项目组按钮
        Then 新建分组应显示在此文件夹下的最前面

    Scenario: 12-空项目树时创建分组
        Given 用户在应用程序管理页面
            And 项目树中没有任何节点
        When 用户点击了“创建分组”按钮
        Then 新建分组应显示在根目录下的最前面

Feature: 平台用户可以输入用户名

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