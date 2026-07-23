/* ============================================
   辰思企业官网 - 交互脚本
   ============================================ */

(function () {
    'use strict';

    /* ========== 导航栏滚动效果 ========== */
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (scrollTop > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ========== 汉堡菜单 ========== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击菜单项后关闭移动端菜单
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ========== 返回顶部 ========== */
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========== 滚动渐入动画 ========== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in').forEach(function (el) {
        observer.observe(el);
    });

    /* ========== 数字计数动画 ========== */
    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo
            var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            element.textContent = Math.floor(eased * target).toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
        counterObserver.observe(el);
    });

    /* ========== 联系表单提交 ========== */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 获取表单数据
            var name = document.getElementById('name').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var email = document.getElementById('email').value.trim();
            var service = document.getElementById('serviceType').value;
            var message = document.getElementById('message').value.trim();

            // 简单验证
            if (!name) {
                showMessage('请输入您的姓名', 'error');
                return;
            }

            if (!phone && !email) {
                showMessage('请至少填写一种联系方式', 'error');
                return;
            }

            if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
                showMessage('请输入正确的手机号码', 'error');
                return;
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage('请输入正确的邮箱地址', 'error');
                return;
            }

            // 模拟提交
            var submitBtn = contactForm.querySelector('.form-submit');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showMessage('感谢您的留言！我们的专业顾问将在24小时内与您联系。', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showMessage(text, type) {
        var existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        var message = document.createElement('div');
        message.className = 'form-message ' + (type === 'success' ? 'success' : 'error');
        message.textContent = text;
        message.style.cssText = type === 'success'
            ? 'background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; padding: 12px 20px; border-radius: 6px; margin-top: 16px; font-size: 0.9rem;'
            : 'background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; padding: 12px 20px; border-radius: 6px; margin-top: 16px; font-size: 0.9rem;';

        var form = document.getElementById('contactForm');
        form.appendChild(message);

        setTimeout(function () {
            message.remove();
        }, 5000);
    }

    /* ========== 导航高亮 ========== */
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ========== 初始化 ========== */
    handleScroll();
})();
