server

- id 不自增，手动指定
- dto 增加 @ValidateNested({ each: true }) @Type(() => ProjectOperationRecordDto)
- dto 增加
- 删除 forwardRef 生成 使用函数即可
- 生成 dto 一个 class 一个文件，避免循环引用
