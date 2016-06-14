import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

Meteor.startup(() => {
  // Set Biomodels collection index
  // Biomodels._dropIndex("biomodels_search");

  Biomodels._ensureIndex({
    title: 'text',
    description: 'text',
    full_description: 'text',
  }, {name: "biomodels_search"},
  {default_language: "russian"});

  // Create dev start page heading data
  const init_start_heading = {

    text: "Откройте для себя биологические тренажеры!"

  };

  if (StartHeading.find().count() === 0) {

    StartHeading.insert(init_start_heading);

  }

  // Create dev start page data
  const init_start = [

    {
      title: "Выгодная стоимость практического тренинга",
      description: "в сравнении с компьютерными тренажерами, муляжами и лабораторными животными.",
      photo: "/placeholder.png"
    },
    {
      title: "Оригинальные детали, разборная конструкция тренажера",
      description: "удобно транспортировать и легко собирать тренажер.",
      photo: "/placeholder.png"
    },
    {
      title: "Разрешительная документация",
      description: "позволяет перевозить биомодели в другие города.",
      photo: "/placeholder1.jpg"
    },
    {
      title: "Закупка биоматериала на сертифицированных предприятиях",
      description: "надежный профиль безопасности позволяет проводить обучение вне специализированных тренинг-центров.",
      photo: "/placeholder1.jpg"
    }

  ];

  // Add start page data if none
  if (Start.find().count() === 0) {

    _.each(init_start, function(start) {
      Start.insert(start);
      console.log("Added "+start.title);
    });

  }

  // Create dev biomodels
  const init_biomodels = [

    {
      title: "Удаление инородных тел",
      description: "0 Пищевод, желудок с 5 маркированными участками",
      full_description: "0 В желудке  5  маркированных участков (участки расположены в областях наиболее пригодных для разделения слоев стенки желудка). Для отработки манипуляций можно использовать: эндоскопическую инъекционную иглу, электрохирургический нож.",
      photos: ["/p11.jpg", "/p12.jpg", "/p13.jpg"],
      pic: "/p1.jpg",
      price: 3000.01
    },
    {
      title: "Стентирование пищевода",
      description: "1 Пищевод, желудок с 5 маркированными участками",
      full_description: "1 В желудке  5  маркированных участков (участки расположены в областях наиболее пригодных для разделения слоев стенки желудка). Для отработки манипуляций можно использовать: эндоскопическую инъекционную иглу, электрохирургический нож.",
      photos: ["/p21.jpg", "/p22.jpg", "/p23.jpg"],
      pic: "/p2.jpg",
      price: 2000.99
    },
    {
      title: "Эндоскопический гемостаз",
      description: "2 Пищевод, желудок с 5 маркированными участками",
      full_description: "2 В желудке  5  маркированных участков (участки расположены в областях наиболее пригодных для разделения слоев стенки желудка). Для отработки манипуляций можно использовать: эндоскопическую инъекционную иглу, электрохирургический нож.",
      photos: ["/p31.jpg", "/p32.jpg", "/p33.jpg"],
      pic: "/p3.jpg",
      price: 2500.25
    }

  ];

  // Add Biomodels if none
  if (Biomodels.find().count() === 0) {

    _.each(init_biomodels, function(biomodel) {
      Biomodels.insert(biomodel);
      console.log("Added "+biomodel.title+" biomodel.");
    });

  }

  // Dev simulators
  const init_simulators = [

    {
      title: "SIMEX GI",
      description: "Тренажер Simex GI.",
      photo: "/p11.jpg",
      price: 2000
    },
    {
      title: "Деталь",
      description: "Деталь для тренажера Simex GI",
      photo: "/p21.jpg",
      price: 1500
    },

  ];

  if (Simulators.find().count() === 0) {

    _.each(init_simulators, function(simulator) {
      Simulators.insert(simulator);
      console.log("Added "+simulator.title+" simulator.");
    });

  }

  // Dev product info
  const init_pi = [

    {
      product: "biomodel",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
      product: "simulator",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

  ];

  if (ProductInfo.find().count() === 0) {

    _.each(init_pi, function(product) {
      ProductInfo.insert(product);
      console.log("Added "+product.product+" info.");
    });

  }

  // Create manual steps
  const init_mansteps = [

    {
      index: 1,
      description: "Слейте консервационный раствор в канализацию. Достаньте биомодель из упаковки. Упаковку выбросите в мусорный контейнер (1). Важно: специфический запах биомодели и цвет консервационного раствора НЕ являются признаками годности биомодели!",
      photos: [
        "/placeholder.png"
      ]
    },
    {
      index: 5,
      description: "При необходимости под желудок расположите нейтральный электрод (5.1) и систему для инфузии подсоедините к катетерам (5.2).",
      photos: [
        "/placeholder1.jpg", "/placeholder.png"
      ]
    },
    {
      index: 7,
      description: "После использования, удалите биологические ткани с пластиковых деталей.  Утилизируйте биологические ткани в установленном порядке (7).",
      photos: [
        "/placeholder.png"
      ]
    }

  ];

  if (ManualSteps.find().count() === 0) {

    _.each(init_mansteps, function(step) {
      ManualSteps.insert(step);
      console.log("Added step number "+step.index);
    });

  }

  // Create dev users
  const init_users = [
  	// Admin users
  	{
  		firstName: "Serj",
      familyName: "Admin",
  		email: "serj.dukareff@gmail.com",
  		password: "simex",
  		admin: true
  	},
  	{
  		firstName: "Simex",
      familyName: "Admin",
  		email: "simex@simex.train",
  		password: "biomodel",
  		admin: true
  	},
  	// Client users
  	{
        firstName: "test1",
        secondName: "TestUser",
        familyName: "Test1",
        email: "test1@test.com",
        password: "123",
        address: "test1 address",
        news: true
    },
    {
        firstName: "test2",
        secondName: "TestUser",
        familyName: "Test2",
        email: "test2@test.com",
		    password: "123",
        address: "test2 address",
        news: false
    },
    {
        firstName: "test3",
        secondName: "TestUser",
        familyName: "Test3",
        email: "test3@test.com",
        password: "123",
        address: "test3 address",
        news: true
    },
    {
        firstName: "test4",
        secondName: "TestUser",
        familyName: "Test4",
        email: "test4@test.com",
        password: "123",
        address: "test4 address",
        news: false
    },
    {
        firstName: "test5",
        secondName: "TestUser",
        familyName: "Test5",
        email: "test5@test.com",
        password: "123",
        address: "test5 address",
        news: true
    }
  ];
  // Add users if none exist
  if (Meteor.users.find().count() === 0) {
  	_.each(init_users, function(user) {
  		Accounts.createUser(user);
  		console.log("Created user "+user.firstName);
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
  };
  // Add about data if none
  if (About.find().count() === 0) {
    About.insert(init_about);
    console.log("Added about data.");
  }

  // Initial validity data
  const init_validity = {
    title: "Валидность биомоделей",
    text: "Многие диагностические и лечебные процедуры технически сложные и часто связаны с риском возникновения осложнений(1, 6). Поэтому, многие специалисты отрабатывают практические навыки на разнообразных тренажерах(1). Однако, только работа на биологических тканях позволяет максимально использовать функциональные возможности «реального» оборудования и инструментария. Отработка мануальных навыков на лабораторных животных затруднена по этическим и юридическим аспектам. У лабораторных животных крайне сложно моделировать клиническую патологию, а разнообразие создаваемых патологий крайне ограничено. В одной биологической модели возможно одновременное моделирование нескольких патологий. При этом их реалистичность максимально приближена к клинической практике(3). По данным исследований, проведение практических тренингов с использованием биологических симуляторов положительно влияет на кривую обучения специалистов и повышает уверенность у них в своих практических навыках(1, 3, 5, 6, 7). Такой вид тренажеров позволяет отрабатывать мануальные навыки с использованием реального оборудования и инструментария, с возможностью электрического воздействия. При выполнении учебных манипуляций специалист получает более реалистичные ощущения при работе с биологической тканью в отличие от механических тренажеров и муляжей(4). Кроме того, при работе с биологическими тренажерами специалист имеет возможность отрабатывать навыки по «исправлению» осложнений, возникших во время выполнения манипуляции. Доступность по цене(2, 4), этическая и юридическая правомерность, позволяют широко использовать этот вид тренажеров при подготовке специалистов(1, 3). При должном эпидемиологическом контроле производства еx vivo симуляторов, их использование возможно и вне специализированных тренинг-центров(2). Использование тренажеров компании «SIMEX» в практических тренингах позволяет отрабатывать разнообразные технически сложные манипуляции. Благодаря биологической основе моделей, становится возможной полноценная демонстрация особенностей применения и преимуществ различного оборудования и инструментария.",
    reference_title: "Ссылки на литературу:",
    references: "1. Parra-Blanco A, González N, González R. Animal models for endoscopic training: do we really need them? Endoscopy 2013; 45: 478–484. 2. Matthes K, Cohen J, Kochman M. L. Efficacy and costs of a one-day hands-on EASIE endoscopy simulator train-the-trainer workshop. Gastrointest Endosc 2005; 62; 6: 921-927. 3. Martinek J, Suchanek S, Stefanova M. Training on an ex vivo animal model improves endoscopic skills: a randomized, single-blind study. Gastrointest Endosc 2011; 74; 2: 367-373. 4. Maiss J, Naegel A, Hochberger J. The European experience—current use of simulator training in Europe. Techniques in Gastrointestinal Endoscopy 2011; 13: 126-131. 5. Greenwald D, Cohen J. Evolution of Endoscopy Simulators and Their Application. Gastrointest Endoscopy Clin N Am 2006; 16: 389–406. 6. Haycock A, Youd P, Bassett P. Simulator training improves practical skills in therapeutic GI endoscopy: results from a randomized, blinded, controlled study. Gastrointest Endosc 2009; 70; 5: 835 -845. 7. Parra-Blanco A, Arnau MR, Nikolas-Perez D, et al. Endoscopic submucosal dissection training with pig models in a Western country. World J Gastroenterol 2010;16: 2895-2900."
  };
  // Add validity data if none
  if (Validity.find().count() === 0) {
    Validity.insert(init_validity);
    console.log("Added validity data.");
  }

  // Initial contacts data
  const init_contacts = {
    address: "115191, г. Москва, пер. Духовской, д. 17, строен. 15, офис 12",
    email: "simex.biomodel@gmail.com",
    tel: "+7(499)343-36-31",
    web: "www.simex.training",
    location: {
      latitude: 55.703876,
      longitude: 37.615890
    }
  };
  // Add contacts data if none
  if (Contacts.find().count() === 0) {
    Contacts.insert(init_contacts);
    console.log("Added contacts data.");
  }
  
});
