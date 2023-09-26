package icu.zhnblog.blogapi.controller.admin;

import icu.zhnblog.blogapi.service.SysUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author zhn
 * @version 1.0
 * @date 2023/9/23 20:50
 * @blog www.zhnblog.icu
 */
@RestController
@RequestMapping("/admin/user")
public class UserAdminController {
    @Resource
    private SysUserService sysUserService;

    @GetMapping("/count")
    public String getCount() {
        long count = sysUserService.count();
        return String.valueOf(count);
    }
}
