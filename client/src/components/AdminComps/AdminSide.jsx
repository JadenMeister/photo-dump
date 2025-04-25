

function TotalVisit() {

    const menuItems = ["DashBoard", "Users", "Statistics" ]

  return (

      <div className="w-full h-full flex">

          <div className="h-screen w-76.5 text-m font-bold text-white bg-[#0E121E] p-10">
              <div className="text-4xl mb-10">
                  Admin DashBoard
              </div>

              <ul className=" flex flex-col gap-5 mt-10">
                  {menuItems.map((item, index) => (
                      <li key={index} className="text-xl cursor-pointer hover:text-[#FF7F50]">
                          {item}
                      </li>
                  ))}
              </ul>

          </div>

      </div>
  );
}

export default TotalVisit;