const data = Array.from({ length: 30 }).map((_, i) => ({
    href: 'https://sun-asterisk.vn/ve-chung-toi/',
    title: `Kỹ sư hệ thống/ Kỹ sư phần mềm - Lương cứng ${30} Triệu`,
    company: 'Sun Asterisk Inc.',
    location: 'Hà Nội',
    daysLeft: 24,
    experience: `${i%10 + 1} năm`,
    position: 'Junior',
    salary: `${15 + i} - ${30 + i} triệu`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));
  
  export default data;
  