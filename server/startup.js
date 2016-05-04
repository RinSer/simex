import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Create dev users
  const init_users = [
  	// Admin users
  	{
  		name: "Serj",
  		email: "serj.dukareff@gmail.com",
  		password: "simex",
  		admin: true
  	},
  	{
  		name: "Simex",
  		email: "simex@simex.train",
  		password: "biomodel",
  		admin: true
  	},
  	// Client users
  	{
        name: "test1",
        email: "test1@test.com",
        password: "123",
        address: "test1 address"
    },
    {
        name: "test2",
        email: "test2@test.com",
		password: "123",
        address: "test2 address"
    },
    {
        name: "test3",
        email: "test3@test.com",
        password: "123",
        address: "test3 address"
    },
    {
        name: "test4",
        email: "test4@test.com",
        password: "123",
        address: "test4 address"
    },
    {
        name: "test5",
        email: "test5@test.com",
        password: "123",
        address: "test5 address"
    }
  ];
  // Add users if none exist
  if (Meteor.users.find().count() === 0) {
  	_.each(init_users, function(user) {
  		Accounts.createUser(user);
  		console.log("Created user "+user.name);
  	});
  }

  // Create initial news page slogan
  const init_news_slogan = {
    title: "БИОМОДЕЛИ «ЛИДЕРЫ ПРОДАЖ»",
    quote: "Откройте для себя самые актуальные тренажеры!",
    text: "В наших тренажерах мы используем современные научные разработки для создания самых актуальных патологий!"
  };

  if (NewsSlogan.find().count() === 0) {
    NewsSlogan.insert(init_news_slogan);
    console.log("Added initial news page data.");
  }

  // Create dev news
  const init_news = [

    {
      title: "Актуальные биомодели",
      photos: [
        {
          description: "Кровотечение",
          url: "/p11.jpg",
          text: "Гастродуоденальное кровотечение Forrest I. Электрокоагуляция, клиппирование и обкалывание \"нативных\" сосудов."
        },
        {
          description: "Полипы",
          url: "/p13.jpg",
          text: "Полипы на ножке и широком основании. Биопсия и электрохирургические методы полипэктомии."
        },
        {
          description: "Заглушка",
          url: "/p12.jpg",
          text: "Там на неведомых тропинках следы неведомых зверей."
        },
      ],
      createdAt: new Date()-1000
    },
    {
      title: "Более актуальные биомодели",
      photos: [
        {
          description: "Кровотечение",
          url: "/p21.jpg",
          text: "Гастродуоденальное кровотечение Forrest I. Электрокоагуляция, клиппирование и обкалывание \"нативных\" сосудов."
        },
        {
          description: "Полипы",
          url: "/p23.jpg",
          text: "Полипы на ножке и широком основании. Биопсия и электрохирургические методы полипэктомии."
        },
        {
          description: "Заглушка",
          url: "/p22.jpg",
          text: "Там на неведомых тропинках следы неведомых зверей."
        },
      ],
      createdAt: new Date()-100
    },
    {
      title: "Самые актуальные биомодели",
      photos: [
        {
          description: "Кровотечение",
          url: "/p31.jpg",
          text: "Гастродуоденальное кровотечение Forrest I. Электрокоагуляция, клиппирование и обкалывание \"нативных\" сосудов."
        },
        {
          description: "Полипы",
          url: "/p33.jpg",
          text: "Полипы на ножке и широком основании. Биопсия и электрохирургические методы полипэктомии."
        },
        {
          description: "Заглушка",
          url: "/p32.jpg",
          text: "Там на неведомых тропинках следы неведомых зверей."
        },
      ],
      link: {
        url: "#",
        text: "Перейти на сайт партнера"
      },
      createdAt: new Date()
    }
  ];
  // Add news if none exist
  if (News.find().count() === 0) {
    _.each(init_news, function(news) {
      News.insert(news);
      console.log('Added '+news.title+' to news');
    });
  }

  // Initial about page data
  const init_about = {
    title: "Миссия",
    text: "Компания «SIMEX» предоставляет возможность большому кругу специалистов осваивать «новые» медицинские манипуляции и работу с инновационным медицинским оборудованием.&#13;&#10;&#13;&#10;«SIMEX» - ведущая российская компания в сфере разработки и производства биологических симуляторов для медицины.&#13;&#10;&#13;&#10;Все сотрудники компании «SIMEX» стремятся к тому, чтобы каждый день вносить свой вклад в обучение медицинских специалистов, с целью повышения доступности высокотехнологичной медицинской помощи населению России.&#13;&#10;&#13;&#10;Мы разрабатываем новые продукты и услуги, соответствующие отраслевым стандартам, и предлагаем нашим клиентам все более высокий уровень качества и разнообразия.&#13;&#10;&#13;&#10;Для осуществления целей по повышению доступности и качества практических тренингов компания «SIMEX» сотрудничает с ведущими медицинскими сообществами, производителями медицинского оборудования и фармацевтическими компаниями.&#13;&#10;&#13;&#10;Компания «SIMEX» принимает участие в практических тренингах, обеспечивая их специализированными биологическими тренажерами.&#13;&#10;&#13;&#10;Продукция «SIMEX» отвечает современным трендам и потребностям образовательных программ, благодаря участию компании в практических тренингах и ее сотрудничеству с ведущими специалистами.&#13;&#10;&#13;&#10;",
    quote: {
      person:"Генеральный директор ООО «SIMEX» Апакова Анна Шамильевна:",
      text:"«Миссия компании «SIMEX» заключается в предоставлении возможности освоения специалистами различных манипуляций посредством производства широкого ассортимента удобных и функциональных биологических симуляторов по доступным ценам»."
    }
  }
  // Add about data if none
  if (About.find().count() === 0) {
    About.insert(init_about);
    console.log("Added about data.");
  }
});
