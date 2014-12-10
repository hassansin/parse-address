var parser = require('./address');

var address =[ 
	"1005 Gravenstein Hwy 95472",
	"1005 Gravenstein Hwy, 95472",
	"1005 Gravenstein Hwy N, 95472",
	"1005 Gravenstein Highway North, 95472",
	"1005 N Gravenstein Highway, Sebastopol, CA",
	"1005 N Gravenstein Highway, Suite 500, Sebastopol, CA",
	"1005 N Gravenstein Hwy Suite 500 Sebastopol, CA",
	"1005 N Gravenstein Highway, Sebastopol, CA, 95472",
	"1005 N Gravenstein Highway Sebastopol CA 95472",
	"1005 Gravenstein Hwy N Sebastopol CA",
	"1005 Gravenstein Hwy N, Sebastopol CA",
	"1005 Gravenstein Hwy, N Sebastopol CA",
	"1005 Gravenstein Hwy, North Sebastopol CA",
	"1005 Gravenstein Hwy Sebastopol CA",
	"115 Broadway San Francisco CA",
	"7800 Mill Station Rd, Sebastopol, CA 95472",
	"7800 Mill Station Rd Sebastopol CA 95472",
	"1005 State Highway 116 Sebastopol CA 95472",
	"1600 Pennsylvania Ave. Washington DC",
	"1600 Pennsylvania Avenue Washington DC",
	"48S 400E, Salt Lake City UT",
	"100 South St, Philadelphia, PA",
	"100 S.E. Washington Ave, Minneapolis, MN",
	"3813 1/2 Some Road, Los Angeles, CA",
	"Mission & Valencia San Francisco CA",
	"Mission & Valencia, San Francisco CA",
	"Mission St and Valencia St San Francisco CA",
	"Mission St & Valencia St San Francisco CA",
	"Mission and Valencia Sts San Francisco CA",
	"Mission & Valencia Sts. San Francisco CA",
	"Mission & Valencia Streets San Francisco CA",
	"Mission Avenue and Valencia Street San Francisco CA"
];

address.forEach(function(e){
	var parsed = parser.parseLocation(e);
	console.log(e);
	console.log(parsed);
})