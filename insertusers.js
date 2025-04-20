const mongoose = require('mongoose');
const User = require('./models/user-model'); // Adjust the path if necessary
const connectDb = require('./middleware/connactDb');
const users =[
    {
        "username": "student1",
        "password": "123456",
        "role": "student",
        "fullName": "إبراهيم السبيعي"
    },
    {
        "username": "student2",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان التميمي"
    },
    {
        "username": "teacher3",
        "password": "123456",
        "role": "teacher",
        "fullName": "أحمد المالكي"
    },
    {
        "username": "student4",
        "password": "123456",
        "role": "student",
        "fullName": "مروان القحطاني"
    },
    {
        "username": "student5",
        "password": "123456",
        "role": "student",
        "fullName": "مالك التميمي"
    },
    {
        "username": "teacher6",
        "password": "123456",
        "role": "teacher",
        "fullName": "أحمد التميمي"
    },
    {
        "username": "student7",
        "password": "123456",
        "role": "student",
        "fullName": "عبد الله السبيعي"
    },
    {
        "username": "student8",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان الغامدي"
    },
    {
        "username": "teacher9",
        "password": "123456",
        "role": "teacher",
        "fullName": "يوسف القرشي"
    },
    {
        "username": "student10",
        "password": "123456",
        "role": "student",
        "fullName": "علي الحسني"
    },
    {
        "username": "student11",
        "password": "123456",
        "role": "student",
        "fullName": "حسين التميمي"
    },
    {
        "username": "teacher12",
        "password": "123456",
        "role": "teacher",
        "fullName": "سفيان الشمراني"
    },
    {
        "username": "student13",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان الحسني"
    },
    {
        "username": "student14",
        "password": "123456",
        "role": "student",
        "fullName": "عمرو الحسني"
    },
    {
        "username": "teacher15",
        "password": "123456",
        "role": "teacher",
        "fullName": "يوسف الحربي"
    },
    {
        "username": "student16",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن الحسني"
    },
    {
        "username": "student17",
        "password": "123456",
        "role": "student",
        "fullName": "طارق العتيبي"
    },
    {
        "username": "teacher18",
        "password": "123456",
        "role": "teacher",
        "fullName": "بدر الشمراني"
    },
    {
        "username": "student19",
        "password": "123456",
        "role": "student",
        "fullName": "زياد الدوسري"
    },
    {
        "username": "student20",
        "password": "123456",
        "role": "student",
        "fullName": "زياد الهاشمي"
    },
    {
        "username": "teacher21",
        "password": "123456",
        "role": "teacher",
        "fullName": "رامي الحربي"
    },
    {
        "username": "student22",
        "password": "123456",
        "role": "student",
        "fullName": "إبراهيم الشمراني"
    },
    {
        "username": "student23",
        "password": "123456",
        "role": "student",
        "fullName": "طارق السبيعي"
    },
    {
        "username": "teacher24",
        "password": "123456",
        "role": "teacher",
        "fullName": "بدر الشريف"
    },
    {
        "username": "student25",
        "password": "123456",
        "role": "student",
        "fullName": "فهد الأنصاري"
    },
    {
        "username": "student26",
        "password": "123456",
        "role": "student",
        "fullName": "علي الشمراني"
    },
    {
        "username": "teacher27",
        "password": "123456",
        "role": "teacher",
        "fullName": "علي الدوسري"
    },
    {
        "username": "student28",
        "password": "123456",
        "role": "student",
        "fullName": "زياد القحطاني"
    },
    {
        "username": "student29",
        "password": "123456",
        "role": "student",
        "fullName": "خالد الغامدي"
    },
    {
        "username": "teacher30",
        "password": "123456",
        "role": "teacher",
        "fullName": "طارق الدوسري"
    },
    {
        "username": "student31",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن القرشي"
    },
    {
        "username": "student32",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن الحربي"
    },
    {
        "username": "teacher33",
        "password": "123456",
        "role": "teacher",
        "fullName": "بدر الهاشمي"
    },
    {
        "username": "student34",
        "password": "123456",
        "role": "student",
        "fullName": "زياد العسيري"
    },
    {
        "username": "student35",
        "password": "123456",
        "role": "student",
        "fullName": "فهد القرشي"
    },
    {
        "username": "teacher36",
        "password": "123456",
        "role": "teacher",
        "fullName": "زياد القحطاني"
    },
    {
        "username": "student37",
        "password": "123456",
        "role": "student",
        "fullName": "فهد الحسني"
    },
    {
        "username": "student38",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان القحطاني"
    },
    {
        "username": "teacher39",
        "password": "123456",
        "role": "teacher",
        "fullName": "علي القحطاني"
    },
    {
        "username": "student40",
        "password": "123456",
        "role": "student",
        "fullName": "وليد الشمراني"
    },
    {
        "username": "student41",
        "password": "123456",
        "role": "student",
        "fullName": "خالد القرشي"
    },
    {
        "username": "teacher42",
        "password": "123456",
        "role": "teacher",
        "fullName": "سعيد الأنصاري"
    },
    {
        "username": "student43",
        "password": "123456",
        "role": "student",
        "fullName": "طارق القرشي"
    },
    {
        "username": "student44",
        "password": "123456",
        "role": "student",
        "fullName": "خالد المالكي"
    },
    {
        "username": "teacher45",
        "password": "123456",
        "role": "teacher",
        "fullName": "سعيد الشريف"
    },
    {
        "username": "student46",
        "password": "123456",
        "role": "student",
        "fullName": "مالك الشريف"
    },
    {
        "username": "student47",
        "password": "123456",
        "role": "student",
        "fullName": "عبد الله الأنصاري"
    },
    {
        "username": "teacher48",
        "password": "123456",
        "role": "teacher",
        "fullName": "خالد الحربي"
    },
    {
        "username": "student49",
        "password": "123456",
        "role": "student",
        "fullName": "سعيد الغامدي"
    },
    {
        "username": "student50",
        "password": "123456",
        "role": "student",
        "fullName": "حسين الشريف"
    },
    {
        "username": "teacher51",
        "password": "123456",
        "role": "teacher",
        "fullName": "يوسف الشمراني"
    },
    {
        "username": "student52",
        "password": "123456",
        "role": "student",
        "fullName": "مالك القرشي"
    },
    {
        "username": "student53",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن السبيعي"
    },
    {
        "username": "teacher54",
        "password": "123456",
        "role": "teacher",
        "fullName": "زياد القحطاني"
    },
    {
        "username": "student55",
        "password": "123456",
        "role": "student",
        "fullName": "طارق السبيعي"
    },
    {
        "username": "student56",
        "password": "123456",
        "role": "student",
        "fullName": "عمرو القحطاني"
    },
    {
        "username": "teacher57",
        "password": "123456",
        "role": "teacher",
        "fullName": "مالك الأنصاري"
    },
    {
        "username": "student58",
        "password": "123456",
        "role": "student",
        "fullName": "علي القحطاني"
    },
    {
        "username": "student59",
        "password": "123456",
        "role": "student",
        "fullName": "طارق العنزي"
    },
    {
        "username": "teacher60",
        "password": "123456",
        "role": "teacher",
        "fullName": "مالك الشريف"
    },
    {
        "username": "student61",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان الشمراني"
    },
    {
        "username": "student62",
        "password": "123456",
        "role": "student",
        "fullName": "يوسف القحطاني"
    },
    {
        "username": "teacher63",
        "password": "123456",
        "role": "teacher",
        "fullName": "أحمد الحربي"
    },
    {
        "username": "student64",
        "password": "123456",
        "role": "student",
        "fullName": "سعيد الحسني"
    },
    {
        "username": "student65",
        "password": "123456",
        "role": "student",
        "fullName": "علي الحسني"
    },
    {
        "username": "teacher66",
        "password": "123456",
        "role": "teacher",
        "fullName": "سفيان العسيري"
    },
    {
        "username": "student67",
        "password": "123456",
        "role": "student",
        "fullName": "علي الهاشمي"
    },
    {
        "username": "student68",
        "password": "123456",
        "role": "student",
        "fullName": "يوسف الهاشمي"
    },
    {
        "username": "teacher69",
        "password": "123456",
        "role": "teacher",
        "fullName": "أحمد الحربي"
    },
    {
        "username": "student70",
        "password": "123456",
        "role": "student",
        "fullName": "حسين القحطاني"
    },
    {
        "username": "student71",
        "password": "123456",
        "role": "student",
        "fullName": "مروان العسيري"
    },
    {
        "username": "teacher72",
        "password": "123456",
        "role": "teacher",
        "fullName": "زياد الدوسري"
    },
    {
        "username": "student73",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن الهاشمي"
    },
    {
        "username": "student74",
        "password": "123456",
        "role": "student",
        "fullName": "أيمن القرشي"
    },
    {
        "username": "teacher75",
        "password": "123456",
        "role": "teacher",
        "fullName": "وليد الحربي"
    },
    {
        "username": "student76",
        "password": "123456",
        "role": "student",
        "fullName": "أحمد الغامدي"
    },
    {
        "username": "student77",
        "password": "123456",
        "role": "student",
        "fullName": "حسين الشريف"
    },
    {
        "username": "teacher78",
        "password": "123456",
        "role": "teacher",
        "fullName": "مالك الشمراني"
    },
    {
        "username": "student79",
        "password": "123456",
        "role": "student",
        "fullName": "سفيان الغامدي"
    },
    {
        "username": "student80",
        "password": "123456",
        "role": "student",
        "fullName": "مالك الدوسري"
    },
    {
        "username": "teacher81",
        "password": "123456",
        "role": "teacher",
        "fullName": "طارق العنزي"
    },
    {
        "username": "student82",
        "password": "123456",
        "role": "student",
        "fullName": "طارق المالكي"
    },
    {
        "username": "student83",
        "password": "123456",
        "role": "student",
        "fullName": "طارق العتيبي"
    },
    {
        "username": "teacher84",
        "password": "123456",
        "role": "teacher",
        "fullName": "خالد القحطاني"
    },
    {
        "username": "student85",
        "password": "123456",
        "role": "student",
        "fullName": "عمرو القحطاني"
    },
    {
        "username": "student86",
        "password": "123456",
        "role": "student",
        "fullName": "مروان السبيعي"
    },
    {
        "username": "teacher87",
        "password": "123456",
        "role": "teacher",
        "fullName": "خالد العتيبي"
    },
    {
        "username": "student88",
        "password": "123456",
        "role": "student",
        "fullName": "محمد العتيبي"
    },
    {
        "username": "student89",
        "password": "123456",
        "role": "student",
        "fullName": "محمد الشريف"
    },
    {
        "username": "teacher90",
        "password": "123456",
        "role": "teacher",
        "fullName": "أحمد القحطاني"
    },
    {
        "username": "student91",
        "password": "123456",
        "role": "student",
        "fullName": "خالد الحسني"
    },
    {
        "username": "student92",
        "password": "123456",
        "role": "student",
        "fullName": "مروان القرشي"
    },
    {
        "username": "teacher93",
        "password": "123456",
        "role": "teacher",
        "fullName": "محمد الغامدي"
    },
    {
        "username": "student94",
        "password": "123456",
        "role": "student",
        "fullName": "يوسف الحربي"
    },
    {
        "username": "student95",
        "password": "123456",
        "role": "student",
        "fullName": "مالك التميمي"
    },
    {
        "username": "teacher96",
        "password": "123456",
        "role": "teacher",
        "fullName": "علي الأنصاري"
    },
    {
        "username": "student97",
        "password": "123456",
        "role": "student",
        "fullName": "حسين التميمي"
    },
    {
        "username": "student98",
        "password": "123456",
        "role": "student",
        "fullName": "خالد القحطاني"
    },
    {
        "username": "teacher99",
        "password": "123456",
        "role": "teacher",
        "fullName": "مالك المالكي"
    },
    {
        "username": "student100",
        "password": "123456",
        "role": "student",
        "fullName": "أحمد الأنصاري"
    }
];

async function insertUsers() {
    try {
        // Connect to the database
        connectDb();
        // Insert users into the database
        await User.insertMany(users);
        console.log('Users inserted successfully.');

        // Close the database connection
        await mongoose.disconnect();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error inserting users:', error);
    }
}

insertUsers();