const List = ({items,searchText, list}) => {
   
    return (
        <div>
            {items && items.map((item, index) => (
                <div key={index}>
                    <h4 key={item.id}>{item.name}</h4>
                </div>
            ))}
        </div>
    );
}

export default List;