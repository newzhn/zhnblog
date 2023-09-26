package icu.zhnblog.blogapi.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import icu.zhnblog.blogapi.mapper.SysUserMapper;
import icu.zhnblog.blogapi.service.SysUserService;
import icu.zhnblog.blogcommon.domain.entry.SysUser;
import org.springframework.stereotype.Service;

/**
* @author zhanh
* @description 针对表【sys_user(用户信息表)】的数据库操作Service实现
* @createDate 2023-09-23 20:36:42
*/
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>
    implements SysUserService {

}




