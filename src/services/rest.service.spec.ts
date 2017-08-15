import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { RestService } from './rest.service';
import { Category } from '../models';

describe('Service: RestService', () => {
    let backend: MockBackend;
    let service: RestService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                RestService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });

        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(RestService);

    }));

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === 'api/forms') {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);

                connection.mockRespond(response);
            }
        });
    }

    it('should return the list of categories from the server on success', () => {
        setupConnections(backend, {
            body: {
                data: [
                    {
                        name: 'Meat',
                        dishes: [
                            {
                                id: 1,
                                name: 'Hamburger',
                                streamId: 2174454442,
                                price: 60.50,
                                ranking: 4.5,
                                calories: 600,
                                picture: 'https://s3-media1.fl.yelpcdn.com/bphoto/IDTY_hrEyTGCFvaS89YuvQ/o.jpg'
                            },{
                                id: 2,
                                name: 'Breaded',
                                streamId: 2174454444,
                                price: 40.60,
                                ranking: 2.8,
                                calories: 300,
                                picture: 'http://larochelle.com.py/wp-content/uploads/2015/07/milanesa-POLLO.jpeg'
                            },{
                                id: 3,
                                name: 'Barbecue',
                                streamId: 2174454443,
                                price: 99,
                                ranking: 4.9,
                                calories: 1000,
                                picture: 'http://s.rinconrecetas.com/wp-content/uploads/2014/10/plato-de-madera-con-asado.jpg'
                            }
                        ]
                    }, {
                        name: 'Breakfast',
                        dishes: [
                            {
                                id: 4,
                                name: 'Ligth breakfast',
                                streamId: 2174454445,
                                price: 10.20,
                                ranking: 2.6,
                                calories: 200,
                                picture: 'http://video-uroki-online.com/cache/1000_800_min/pravilnyy_zavtrak_sportsmena.jpg'
                            },{
                                id: 5,
                                name: 'Full breakfast',
                                streamId: 2174454446,
                                price: 15.33,
                                ranking: 3.8,
                                calories: 900,
                                picture: 'http://www.thepierhotellimerick.com/wp-content/uploads/2016/12/full-irish-breakfast.jpg'
                            }
                        ]
                    }, {
                        name: 'Drinks',
                        dishes: [
                            {
                                id: 6,
                                name: 'Mate',
                                streamId: 2174454449,
                                price: 3,
                                ranking: 4.6,
                                calories: 30,
                                picture: 'http://healthandtech.iprofesional.com/wp-content/uploads/sites/15/2017/07/Mate-cebado.jpg'
                            },{
                                id: 7,
                                name: 'Cofee',
                                streamId: 2174454450,
                                price: 3,
                                ranking: 4.0,
                                calories: 40,
                                picture: 'https://s-media-cache-ak0.pinimg.com/736x/69/45/24/694524cf653f18816f463b3be86a0479--jom-happy-things.jpg'
                            }
                        ]
                    }
                ]
            },
            status: 200
        });

        service.getCategories().subscribe((data: Category[]) => {
            expect(data.length).toBe(3);
            expect(data[0].name).toBe('Meat');
            expect(data[1].name).toBe('Breakfast');
            expect(data[2].name).toBe('Drinks');
        });
    });

    it('should log an error to the console on error', () => {
        setupConnections(backend, {
            body: { error: `I'm afraid I've got some bad news!` },
            status: 500
        });
        spyOn(console, 'error');

        service.getCategories().subscribe(null, () => {
            expect(console.error).toHaveBeenCalledWith(`I'm afraid I've got some bad news!`);
        });
    });
});