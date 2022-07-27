import './categories.css';

export const CategoryCard = ({categories}) => {
  return categories.map((cat) => {
    if(cat.name.slice(0, 6) === "womens") {  
      return <div className="test_box box-01 col-xs-6 col-md-4" key={cat._id}>
			<div className="inner" style={{backgroundImage: `url(${cat.image})`}}>
				<a href="/" className="test_click">
					<div className="flex_this">
						<h1 className="test_title">{cat.name.slice(7)}</h1>
					</div>
				</a>
			</div>
		</div>
    } else { return null}
  });
}

export const CategoryCardMen = ({categories}) => {
    return categories.map((cat) => {
      if(cat.name.slice(0, 4) === "mens") {  
        return <div className="test_box box-01 col-xs-6 col-md-4" key={cat._id}>
              <div className="inner" style={{backgroundImage: `url(${cat.image})`}}> 
                  <a href="/" className="test_click">
                      <div className="flex_this">
                          <h1 className="test_title">{cat.name.slice(5)}</h1>
                      </div>
                  </a>
              </div>
          </div>
      } else { return null}
    });
  }

  export const CategoryCardOthers = ({categories}) => {
    return categories.map((cat) => {
      if(cat.name.slice(0, 4) === "mens" || cat.name.slice(0, 6) === "womens") {  
        return null 
    } else{
        return <div className="test_box box-01 col-xs-6 col-md-4" key={cat._id}>
              <div className="inner" style={{backgroundImage: `url(${cat.image})`}}>
                  <a href="/" className="test_click">
                      <div className="flex_this">
                          <h1 className="test_title">{cat.name}</h1>
                      </div>
                  </a>
              </div>
          </div>
      } 
    });
  }