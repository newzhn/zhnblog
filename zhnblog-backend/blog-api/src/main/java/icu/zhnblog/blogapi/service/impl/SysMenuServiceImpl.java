package icu.zhnblog.blogapi.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import icu.zhnblog.blogapi.mapper.SysMenuMapper;
import icu.zhnblog.blogapi.service.SysMenuService;
import icu.zhnblog.blogcommon.domain.entry.SysMenu;
import org.springframework.stereotype.Service;

/**
* @author zhanh
* @description 针对表【sys_menu(菜单权限表)】的数据库操作Service实现
* @createDate 2023-09-23 20:36:42
*/
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu>
    implements SysMenuService {

}




