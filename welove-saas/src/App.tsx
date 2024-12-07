
import React from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const App: React.FC = () => {
  const swiperModules = [Pagination, Autoplay];

  const features = [
    {
      icon: "fa-solid fa-heart",
      title: "智能匹配",
      desc: "基于AI算法的精准配对系统"
    },
    {
      icon: "fa-solid fa-shield-heart",
      title: "安全防护",
      desc: "全方位实名认证保护"
    },
    {
      icon: "fa-solid fa-comments",
      title: "即时沟通",
      desc: "丰富的互动交友功能"
    },
    {
      icon: "fa-solid fa-user-group",
      title: "优质社区",
      desc: "严选高质量单身人群"
    }
  ];

  const testimonials = [
    {
      avatar: "https://ai-public.mastergo.com/ai/img_res/9263f2df86464b6624148d235942fde0.jpg",
      name: "陈美琪",
      age: "26岁",
      content: "在微爱上认识了现在的男朋友，平台的匹配机制真的很准确！"
    },
    {
      avatar: "https://ai-public.mastergo.com/ai/img_res/45906357846e2e9bfa810d373001d558.jpg",
      name: "王浩然",
      age: "29岁",
      content: "注重用户隐私保护，让人感觉很安心。界面设计也很精致！"
    },
    {
      avatar: "https://ai-public.mastergo.com/ai/img_res/3e47b7a3fa9bfb694f2dfab021272d62.jpg",
      name: "林晓婷",
      age: "31岁",
      content: "平台上的用户素质都很高，交友体验特别好。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-heart text-2xl text-pink-500"></i>
            <span className="text-2xl font-['Pacifico'] text-gray-800">微爱</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-pink-500">首页</a>
            <a href="#" className="text-gray-600 hover:text-pink-500">关于我们</a>
            <a href="#" className="text-gray-600 hover:text-pink-500">安全中心</a>
            <a href="#" className="text-gray-600 hover:text-pink-500">帮助中心</a>
            <Button className="!rounded-button bg-pink-500 hover:bg-pink-600">立即体验</Button>
          </div>
        </div>
      </nav>

      {/* 主视觉区域 */}
      <div className="pt-16">
        <Swiper
          modules={swiperModules}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-[600px]"
        >
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://ai-public.mastergo.com/ai/img_res/60a18167b420c7329e5956b2d79b5d6a.jpg"
                className="w-full h-full object-cover"
                alt="浪漫约会"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                  <h1 className="text-5xl font-bold mb-6">遇见美好的Ta</h1>
                  <p className="text-xl mb-8">让爱情在这里开始</p>
                  <Button className="!rounded-button bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">开启缘分</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://ai-public.mastergo.com/ai/img_res/0151fb9c15f5d4e477a86b0e42fd63c5.jpg"
                className="w-full h-full object-cover"
                alt="浪漫散步"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                  <h1 className="text-5xl font-bold mb-6">找到真实的爱</h1>
                  <p className="text-xl mb-8">严选优质单身人群</p>
                  <Button className="!rounded-button bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">立即加入</Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 特色功能 */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">为什么选择微爱</h2>
          <div className="grid grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors">
                <i className={`${feature.icon} text-4xl text-pink-500 mb-4`}></i>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 用户见证 */}
      <div className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">真实用户故事</h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    alt={testimonial.name}
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.age}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下载区域 */}
      <div className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">立即开启浪漫之旅</h2>
          <p className="text-gray-600 mb-12">下载微爱App，找到命中注定的那个人</p>
          <div className="flex justify-center gap-6">
            <Button className="!rounded-button bg-gray-900 hover:bg-gray-800">
              <i className="fa-brands fa-apple mr-2"></i>
              App Store下载
            </Button>
            <Button className="!rounded-button bg-gray-900 hover:bg-gray-800">
              <i className="fa-brands fa-android mr-2"></i>
              Android下载
            </Button>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">关于微爱</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-500">公司介绍</a></li>
                <li><a href="#" className="hover:text-pink-500">加入我们</a></li>
                <li><a href="#" className="hover:text-pink-500">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">安全中心</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-500">隐私政策</a></li>
                <li><a href="#" className="hover:text-pink-500">用户协议</a></li>
                <li><a href="#" className="hover:text-pink-500">安全提示</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">帮助中心</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-500">常见问题</a></li>
                <li><a href="#" className="hover:text-pink-500">意见反馈</a></li>
                <li><a href="#" className="hover:text-pink-500">客服支持</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">关注我们</h3>
              <div className="flex gap-4">
                <a href="#" className="text-2xl hover:text-pink-500">
                  <i className="fa-brands fa-weixin"></i>
                </a>
                <a href="#" className="text-2xl hover:text-pink-500">
                  <i className="fa-brands fa-weibo"></i>
                </a>
                <a href="#" className="text-2xl hover:text-pink-500">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p>© 2024 微爱. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

