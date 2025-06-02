document.addEventListener('DOMContentLoaded', async () => {
    const apiCategoriesList = document.getElementById('apiCategoriesList');
    const apiEndpointsContainer = document.getElementById('apiEndpointsContainer');
    const mainContent = document.getElementById('mainContent');
    const welcomeMessageContainer = document.getElementById('welcomeMessageContainer');
    const informationPageContainer = document.getElementById('informationPageContainer');
    const contentSearchContainer = document.getElementById('contentSearchContainer');
    const contentSearchInput = document.getElementById('contentSearchInput');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const docLinkMainPage = document.getElementById('docLinkMainPage');
    const docLinkInformation = document.getElementById('docLinkInformation');
    const sidebarThemeSwitcherSelect = document.getElementById('sidebarThemeSwitcherSelect');
    const prismThemeLink = document.getElementById('prismTheme');
    const sidebarApiUrlSwitcherSelect = document.getElementById('sidebarApiUrlSwitcherSelect');
    const headerLogo = document.querySelector('.header-logo');

    let APP_CONFIG = {
        appName: "Vioo-APIs",
        appVersion: "1.0.0",
        defaultTheme: "light-default",
        apiBaseUrls: [{ name: "Default API", url: "http://localhost:3000" }],
        defaultApiBaseUrlIndex: 0,
        contacts: []
    };

    try {
        const response = await fetch('settings.json');
        if (response.ok) {
            APP_CONFIG = await response.json();
        } else {
            console.warn('settings.json not found or unreadable, using default config.');
        }
    } catch (error) {
        console.warn('Error fetching settings.json, using default config:', error);
    }
    
    document.title = APP_CONFIG.appName;
    if (headerLogo) {
        const appNameParts = APP_CONFIG.appName.split('-');
        headerLogo.innerHTML = `${appNameParts[0]}<span>-${appNameParts.slice(1).join('-')}</span>`;
    }


    let currentOpenCategoryElement = null;
    let userOpenedApiDetailId = null;
    let currentOpenHeaderArrowSpan = null;
    let activeObjectUrls = [];
    let allApisForCurrentCategory = [];
    let currentApiAbortController = null;
    let selectedApiBaseUrl = '';

    const REQUEST_TIMEOUT = 120000;

    const categories = [
      {
        name: "Artificial Intelligence",
        icon: "fas fa-robot",
        apis: [
          {
            id: "openai",
            title: "OpenAI",
            service: "openai",
            description: "Get a response from OpenAI.",
            endpointPath: "/api/openai",
            method: "GET",
            parameters: [
              { name: "q", in: "query", type: "string", description: "Ask to openai.", required: true, example: "Hello, how are you?" }
            ],
            consumes: ["application/json"],
            produces: ["application/json"],
            successResponseExample: {
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: true, result: "Hello! I'm doing well, thank you. How can I assist you today?" }, null, 2)
            },
            responses: {
                "200": { description: "Successful response from OpenAI" },
                "400": { description: "Bad Request, e.g., missing query parameter" }
            }
          },
          {
            id: "claude",
            title: "Claude",
            service: "claude",
            description: "Get a response from Claude.",
            endpointPath: "/api/claude",
            method: "GET",
            parameters: [
              { name: "q", in: "query", type: "string", description: "Ask to claude.", required: true, example: "Explain quantum computing." }
            ],
            consumes: ["application/json"],
            produces: ["application/json"],
            successResponseExample: {
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: true, result: "Quantum computing is..." }, null, 2)
            },
            responses: {
                "200": { description: "Successful response from Claude" }
            }
          },
          {
            id: "uploadImage",
            title: "Upload Image",
            service: "storage",
            description: "Upload an image file for processing.",
            endpointPath: "/api/upload/image/{userId}",
            method: "POST",
            parameters: [
              { name: "userId", in: "path", type: "string", description: "User ID for association.", required: true, example: "user123" },
              { name: "imageFile", in: "formData", type: "file", description: "The image file to upload.", required: true, accept: "image/*" },
              { name: "caption", in: "formData", type: "string", description: "Optional caption for the image.", required: false, example: "My vacation photo" },
              { name: "isPublic", in: "formData", type: "boolean", description: "Set image public or private.", required: false, defaultValue: false}
            ],
            consumes: ["multipart/form-data"],
            produces: ["application/json"],
            successResponseExample: {
              statusCode: 201,
              headers: { "Content-Type": "application/json", "Location": "/images/new_image.jpg" },
              body: JSON.stringify({ status: true, message: "Image uploaded successfully", fileId: "xyz789", url: "/images/new_image.jpg" }, null, 2)
            },
            responses: {
                "201": { description: "Image uploaded successfully." },
                "400": { description: "Bad request, e.g., no file or invalid file type." }
            }
          }
        ]
      }
    ];

    function applyTheme(theme) {
        document.body.className = '';
        const accentColorMapping = {
            'light-default': '#3498db', 'light-yellow': '#ffc300',
            'dark-okaidia': '#58a6ff', 'dark-tomorrow': '#ffc300'
        };
        const buttonTextColorMapping = {
            'light-default': '#FFFFFF', 'light-yellow': '#333333',
            'dark-okaidia': '#1c2128', 'dark-tomorrow': '#1c2128'
        };
        const bodyClassMapping = {
            'light-default': 'light-blue', 'light-yellow': 'light-yellow',
            'dark-okaidia': 'dark-blue', 'dark-tomorrow': 'dark-yellow'
        };
        const prismThemeMapping = {
            'light-default': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
            'light-yellow': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
            'dark-okaidia': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css',
            'dark-tomorrow': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css'
        };

        const effectiveBodyClass = bodyClassMapping[theme] || 'light-blue';
        if (effectiveBodyClass.startsWith('dark')) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.add('light');
        }
        document.body.classList.add(effectiveBodyClass);

        document.documentElement.style.setProperty('--accent-color', accentColorMapping[theme]);
        document.documentElement.style.setProperty('--button-text-color', buttonTextColorMapping[theme]);

        if (prismThemeLink.href !== prismThemeMapping[theme]) {
            prismThemeLink.href = prismThemeMapping[theme];
        }

        localStorage.setItem('selectedTheme', theme);
        if (sidebarThemeSwitcherSelect.value !== theme) {
            sidebarThemeSwitcherSelect.value = theme;
        }

        setTimeout(() => {
            if (typeof Prism !== 'undefined') {
                 Prism.highlightAll();
            }
        }, 50);
    }

    function applyApiUrl(baseUrl) {
        selectedApiBaseUrl = baseUrl;
        localStorage.setItem('selectedApiBaseUrl', baseUrl);
        if (sidebarApiUrlSwitcherSelect.value !== baseUrl) {
            sidebarApiUrlSwitcherSelect.value = baseUrl;
        }
    }
    
    APP_CONFIG.apiBaseUrls.forEach(apiOpt => {
        const option = document.createElement('option');
        option.value = apiOpt.url;
        option.textContent = apiOpt.name;
        sidebarApiUrlSwitcherSelect.appendChild(option);
    });

    const savedApiBaseUrl = localStorage.getItem('selectedApiBaseUrl') || APP_CONFIG.apiBaseUrls[APP_CONFIG.defaultApiBaseUrlIndex]?.url || (APP_CONFIG.apiBaseUrls.length > 0 ? APP_CONFIG.apiBaseUrls[0].url : "");
    applyApiUrl(savedApiBaseUrl);
    sidebarApiUrlSwitcherSelect.addEventListener('change', (e) => applyApiUrl(e.target.value));

    sidebarThemeSwitcherSelect.addEventListener('change', (e) => applyTheme(e.target.value));
    const savedTheme = localStorage.getItem('selectedTheme') || APP_CONFIG.defaultTheme;
    applyTheme(savedTheme);

    function createArrowSpan(isInitiallyOpen = false) {
        const arrowSpan = document.createElement('span');
        arrowSpan.classList.add('arrow');
        arrowSpan.textContent = isInitiallyOpen ? '▾' : '▸';
        return arrowSpan;
    }

    function updateArrow(arrowSpan, isOpen) {
        if (arrowSpan) {
            arrowSpan.textContent = isOpen ? '▾' : '▸';
        }
    }

    function setActiveDocLink(activeLink) {
        document.querySelectorAll('#documentationList .doc-main-item.active').forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }

        if (currentOpenCategoryElement && (!activeLink || !activeLink.closest('#apiCategoriesList'))) {
            const categoryNameDiv = currentOpenCategoryElement;
            const apiListElement = categoryNameDiv.nextElementSibling;
            const arrowSpan = categoryNameDiv.querySelector('.arrow');
            if (apiListElement && apiListElement.classList.contains('expanded')) {
                apiListElement.classList.remove('expanded');
                updateArrow(arrowSpan, false);
            }
            if (categoryNameDiv.classList.contains('active')) {
                 categoryNameDiv.classList.remove('active');
            }
            currentOpenCategoryElement = null;
        }
        document.querySelectorAll('.sidebar .api-list a.active-endpoint').forEach(link => link.classList.remove('active-endpoint'));
    }

    function showContent(type) {
        welcomeMessageContainer.style.display = 'none';
        informationPageContainer.style.display = 'none';
        apiEndpointsContainer.innerHTML = '';
        contentSearchContainer.style.display = 'none';
        allApisForCurrentCategory = [];

        if (type === 'welcome') {
            welcomeMessageContainer.style.display = 'block';
        } else if (type === 'information') {
            informationPageContainer.style.display = 'block';
        } else if (type === 'apiCategory') {
            contentSearchContainer.style.display = 'block';
            contentSearchInput.value = '';
        }
    }

    if (docLinkMainPage) {
        docLinkMainPage.addEventListener('click', (e) => {
            e.preventDefault();
            displayWelcomeMessage();
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }

    if (docLinkInformation) {
        docLinkInformation.addEventListener('click', (e) => {
            e.preventDefault();
            displayInformationPage();
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }

    function displayInformationPage() {
        closeCurrentlyOpenApiDetails();
        showContent('information');
        let contactsHTML = '';
        if (APP_CONFIG.contacts && APP_CONFIG.contacts.length > 0) {
            contactsHTML = APP_CONFIG.contacts.map(contact => `
                <li><i class="${contact.icon || 'fas fa-link'}"></i> <a href="${contact.url}" target="_blank" rel="noopener noreferrer">${contact.text || contact.type}</a></li>
            `).join('');
        }

        informationPageContainer.innerHTML = `
            <div class="page-content-wrapper">
                <div class="page-hero">
                    <h1>About ${APP_CONFIG.appName}</h1>
                    <p>Your central hub for a diverse collection of useful APIs designed to empower your projects.</p>
                </div>
                <div class="page-section">
                    <h3>Get in Touch</h3>
                    <p>Connect with us through the following channels:</p>
                    <ul class="contact-list">
                        ${contactsHTML}
                    </ul>
                     <p style="margin-top:15px;"><strong>Version:</strong> ${APP_CONFIG.appVersion}</p>
                </div>
            </div>`;
        setActiveDocLink(docLinkInformation);
    }

    function renderCategories() {
        apiCategoriesList.innerHTML = '';
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            const categoryNameDiv = document.createElement('div');
            categoryNameDiv.classList.add('category-name');

            if (category.icon) {
                const iconElement = document.createElement('i');
                iconElement.className = category.icon;
                categoryNameDiv.appendChild(iconElement);
            }
            const nameSpan = document.createElement('span');
            nameSpan.className = 'category-text-content';
            nameSpan.textContent = category.name;
            categoryNameDiv.appendChild(nameSpan);

            const arrowSpan = createArrowSpan();
            categoryNameDiv.appendChild(arrowSpan);

            const apiList = document.createElement('ul');
            apiList.classList.add('api-list');

            category.apis.forEach(api => {
                const apiItem = document.createElement('li');
                const apiLink = document.createElement('a');
                apiLink.href = `#${api.id}`;
                apiLink.textContent = api.title;
                apiLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    setActiveDocLink(null);
                    showContent('apiCategory');
                    allApisForCurrentCategory = category.apis;
                    contentSearchInput.value = '';
                    closeCurrentlyOpenApiDetails();
                    displayApiEndpoints([api], category.name, api.id);
                    document.querySelectorAll('.sidebar .api-list a').forEach(link => link.classList.remove('active-endpoint'));
                    apiLink.classList.add('active-endpoint');
                    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                        sidebar.classList.remove('open');
                    }
                });
                apiItem.appendChild(apiLink);
                apiList.appendChild(apiItem);
            });

            categoryNameDiv.addEventListener('click', () => {
                setActiveDocLink(null);
                toggleCategory(category, categoryNameDiv, apiList, arrowSpan);
            });
            updateArrow(arrowSpan, apiList.classList.contains('expanded'));

            categoryItem.appendChild(categoryNameDiv);
            categoryItem.appendChild(apiList);
            apiCategoriesList.appendChild(categoryItem);
        });
    }

    function toggleCategory(category, categoryNameDiv, apiListElement, arrowSpan) {
        const isOpening = !apiListElement.classList.contains('expanded');
        if (isOpening) {
            if (currentOpenCategoryElement && currentOpenCategoryElement !== categoryNameDiv) {
                currentOpenCategoryElement.classList.remove('active');
                const associatedList = currentOpenCategoryElement.nextElementSibling;
                if (associatedList) {
                     associatedList.classList.remove('expanded');
                     updateArrow(currentOpenCategoryElement.querySelector('.arrow'), false);
                }
            }
            apiListElement.classList.add('expanded');
            categoryNameDiv.classList.add('active');
            currentOpenCategoryElement = categoryNameDiv;
            closeCurrentlyOpenApiDetails();
            showContent('apiCategory');
            allApisForCurrentCategory = category.apis;
            contentSearchInput.value = '';
            displayApiEndpoints(category.apis, category.name, null);
        } else {
            apiListElement.classList.remove('expanded');
            categoryNameDiv.classList.remove('active');
            currentOpenCategoryElement = null;
            displayWelcomeMessage();
        }
        updateArrow(arrowSpan, isOpening);
    }

    function displayWelcomeMessage() {
        closeCurrentlyOpenApiDetails();
        showContent('welcome');
        welcomeMessageContainer.innerHTML = `
            <div class="page-content-wrapper">
                <div class="page-hero">
                    <h1>${APP_CONFIG.appName}</h1>
                    <p>Your gateway to a powerful and versatile suite of APIs. Start building something amazing today!</p>
                </div>
                <div class="page-section">
                    <h3>Why ${APP_CONFIG.appName}?</h3>
                    <p>We provide a robust platform with a focus on:</p>
                    <ul>
                        <li><i class="fas fa-bolt"></i> <strong>Performance:</strong> FAST and responsive APIs</li>
                        <li><i class="fas fa-shield-alt"></i> <strong>Reliability:</strong> Safe and trusted by many people</li>
                        <li><i class="fas fa-unlock"></i> <strong>Service:</strong> Completely FREE service and NO API key</li>
                    </ul>
                </div>
            </div>`;
        setActiveDocLink(docLinkMainPage);
    }

    function revokeActiveObjectUrls() {
        activeObjectUrls.forEach(url => URL.revokeObjectURL(url));
        activeObjectUrls = [];
    }

    function closeCurrentlyOpenApiDetails() {
        revokeActiveObjectUrls();
        if (currentApiAbortController) {
            currentApiAbortController.abort();
            currentApiAbortController = null;
        }
        if (userOpenedApiDetailId) {
            const currentlyOpenContainer = document.querySelector(`.api-endpoint-container[data-api-id="${userOpenedApiDetailId}"]`);
            if (currentlyOpenContainer) {
                const injectedDetails = currentlyOpenContainer.querySelector('.endpoint-details-injected');
                if (injectedDetails) {
                    currentlyOpenContainer.removeChild(injectedDetails);
                }
                currentlyOpenContainer.classList.remove('details-open');
                if (currentOpenHeaderArrowSpan) {
                     updateArrow(currentOpenHeaderArrowSpan, false);
                }
            }
        }
        userOpenedApiDetailId = null;
        currentOpenHeaderArrowSpan = null;
    }

    function toggleApiDetailDisplay(containerElement, api, headerArrowSpan, forceOpen = false) {
        const apiId = api.id;
        const isCurrentlyOpenForThisApi = (userOpenedApiDetailId === apiId);
        if (forceOpen) {
            if (!isCurrentlyOpenForThisApi) {
                closeCurrentlyOpenApiDetails();
                const detailContentDiv = createApiDetailContent(api);
                detailContentDiv.classList.add('endpoint-details-injected');
                detailContentDiv.addEventListener('click', e => e.stopPropagation());
                containerElement.appendChild(detailContentDiv);
                containerElement.classList.add('details-open');
                userOpenedApiDetailId = apiId;
                currentOpenHeaderArrowSpan = headerArrowSpan;
                updateArrow(headerArrowSpan, true);
                if (typeof Prism !== 'undefined') Prism.highlightAllUnder(detailContentDiv);
            }
        } else {
            if (isCurrentlyOpenForThisApi) {
                closeCurrentlyOpenApiDetails();
            } else {
                closeCurrentlyOpenApiDetails();
                const detailContentDiv = createApiDetailContent(api);
                detailContentDiv.classList.add('endpoint-details-injected');
                detailContentDiv.addEventListener('click', e => e.stopPropagation());
                containerElement.appendChild(detailContentDiv);
                containerElement.classList.add('details-open');
                userOpenedApiDetailId = apiId;
                currentOpenHeaderArrowSpan = headerArrowSpan;
                updateArrow(headerArrowSpan, true);
                if (typeof Prism !== 'undefined') Prism.highlightAllUnder(detailContentDiv);
            }
        }
    }
    
    function getDisplayPath(api) {
        let path = api.endpointPath;
        if (api.parameters) {
            api.parameters.forEach(param => {
                if (param.in === 'path') {
                    path = path.replace(`{${param.name}}`, `<span style="color: var(--accent-color); font-weight: bold;">{${param.name}}</span>`);
                }
            });
        }
        return path;
    }

    function displayApiEndpoints(apisToDisplay, categoryName, singleApiIdToOpen = null) {
        apiEndpointsContainer.innerHTML = '';
        mainContent.classList.remove('table-view');

        if (apisToDisplay.length === 0 && contentSearchInput.value !== '') {
            apiEndpointsContainer.innerHTML = '<p style="text-align:center; padding:20px;">No APIs found matching your search criteria in this category.</p>';
            return;
        }

        apisToDisplay.forEach(api => {
            const endpointContainer = document.createElement('div');
            endpointContainer.classList.add('api-endpoint-container');
            endpointContainer.dataset.apiId = api.id;
            const header = document.createElement('div');
            header.classList.add('endpoint-header');
            const headerMainInfo = document.createElement('div');
            headerMainInfo.classList.add('endpoint-header-main-info');
            const topLine = document.createElement('div');
            topLine.classList.add('endpoint-header-top-line');
            const methodSpan = document.createElement('span');
            methodSpan.classList.add('endpoint-method', `method-${api.method.toUpperCase()}`);
            methodSpan.textContent = api.method;
            topLine.appendChild(methodSpan);
            const titleSpan = document.createElement('span');
            titleSpan.classList.add('endpoint-title');
            titleSpan.textContent = api.title;
            topLine.appendChild(titleSpan);
            headerMainInfo.appendChild(topLine);
            const urlSpan = document.createElement('span');
            urlSpan.classList.add('endpoint-url');
            urlSpan.innerHTML = getDisplayPath(api);
            headerMainInfo.appendChild(urlSpan);
            const arrowSpan = createArrowSpan();
            header.appendChild(headerMainInfo);
            header.appendChild(arrowSpan);
            endpointContainer.appendChild(header);
            apiEndpointsContainer.appendChild(endpointContainer);
            header.addEventListener('click', () => toggleApiDetailDisplay(endpointContainer, api, arrowSpan));
            const shouldAutoOpen = (singleApiIdToOpen && api.id === singleApiIdToOpen) ||
                                   (!singleApiIdToOpen && userOpenedApiDetailId === api.id);
            if (shouldAutoOpen) {
                setTimeout(() => {
                     toggleApiDetailDisplay(endpointContainer, api, arrowSpan, true);
                     if(singleApiIdToOpen) endpointContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 0);
            } else {
                 updateArrow(arrowSpan, false);
            }
        });
        if (apisToDisplay.length > 0 && singleApiIdToOpen) {
            userOpenedApiDetailId = singleApiIdToOpen;
        } else if (apisToDisplay.length === 0 && !contentSearchInput.value) {
             apiEndpointsContainer.innerHTML = '<p style="text-align:center; padding:20px;">No APIs available in this category yet.</p>';
        }
    }

    function createApiDetailContent(api) {
        const contentWrapper = document.createElement('div');
        const descriptionP = document.createElement('p');
        descriptionP.innerHTML = `<strong>Description:</strong> ${api.description || 'No description available.'}`;
        contentWrapper.appendChild(descriptionP);
        if (api.service) {
            const serviceP = document.createElement('p');
            serviceP.innerHTML = `<strong>Service:</strong> ${api.service}`;
            contentWrapper.appendChild(serviceP);
        }

        if (api.parameters && api.parameters.length > 0) {
            const paramsHeader = document.createElement('h4');
            paramsHeader.textContent = 'Parameters';
            contentWrapper.appendChild(paramsHeader);
            const paramsTable = document.createElement('table');
            paramsTable.classList.add('parameters-table');
            const paramsThead = document.createElement('thead');
            paramsThead.innerHTML = `<tr><th>Name</th><th>Location</th><th>Type</th><th>Description</th><th>Required</th><th>Example</th></tr>`;
            paramsTable.appendChild(paramsThead);
            const paramsTbody = document.createElement('tbody');
            api.parameters.forEach(param => {
                const row = paramsTbody.insertRow();
                row.insertCell().textContent = param.name;
                row.insertCell().innerHTML = `<span class="param-location">${param.in || 'query'}</span>`;
                
                const typeCell = row.insertCell();
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('param-type');
                typeSpan.textContent = param.type + (param.format ? ` (${param.format})` : '');
                typeCell.appendChild(typeSpan);

                row.insertCell().textContent = (param.description || '') + (param.type === 'file' && param.accept ? ` (Accepts: ${param.accept})` : '');
                
                const requiredCell = row.insertCell();
                const requiredSpan = document.createElement('span');
                if (param.required) { requiredSpan.textContent = 'Yes'; requiredSpan.classList.add('required'); }
                else { requiredSpan.textContent = 'No'; }
                requiredCell.appendChild(requiredSpan);
                row.insertCell().textContent = param.example || (param.defaultValue !== undefined ? param.defaultValue : '');
            });
            paramsTable.appendChild(paramsTbody);
            contentWrapper.appendChild(paramsTable);
        }

        const tryItOutSection = document.createElement('div');
        tryItOutSection.classList.add('try-it-out-section');
        tryItOutSection.id = `try-${api.id}`;
        contentWrapper.appendChild(tryItOutSection);
        renderTryItOutForm(tryItOutSection, api);

        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('response-section'); 
        const responsesHeader = document.createElement('h4');
        responsesHeader.textContent = 'Responses';
        responsesContainer.appendChild(responsesHeader);
        
        if (api.responses && Object.keys(api.responses).length > 0) {
            const responsesTable = document.createElement('table');
            responsesTable.classList.add('responses-table');
            const responsesThead = document.createElement('thead');
            responsesThead.innerHTML = `<tr><th>Code</th><th>Description</th></tr>`;
            responsesTable.appendChild(responsesThead);
            const responsesTbody = document.createElement('tbody');
            for (const statusCode in api.responses) {
                const responseDef = api.responses[statusCode];
                const row = responsesTbody.insertRow();
                row.insertCell().textContent = statusCode;
                row.insertCell().textContent = responseDef.description || '';
            }
            responsesTable.appendChild(responsesTbody);
            responsesContainer.appendChild(responsesTable);
        } else {
             responsesContainer.innerHTML += '<p>No specific response codes defined.</p>';
        }
        contentWrapper.appendChild(responsesContainer);


        if (api.successResponseExample) {
            const responseExampleSection = document.createElement('div');
            responseExampleSection.classList.add('response-section');
            responseExampleSection.id = `response-${api.id}`;
            const responseExampleHeader = document.createElement('h4');
            responseExampleHeader.textContent = 'Example Success Response';
            responseExampleSection.appendChild(responseExampleHeader);
            
            const exampleStatus = document.createElement('p');
            exampleStatus.classList.add('response-status');
            exampleStatus.innerHTML = `Status: <span class="status-${api.successResponseExample.statusCode}">${api.successResponseExample.statusCode}</span>`;
            responseExampleSection.appendChild(exampleStatus);

            if (api.successResponseExample.headers) {
                 const exampleHeadersTitle = document.createElement('h5');
                 exampleHeadersTitle.textContent = 'Headers:';
                 responseExampleSection.appendChild(exampleHeadersTitle);
                 const exampleHeadersPre = document.createElement('pre');
                 const codeHeaders = document.createElement('code');
                 codeHeaders.className = 'language-json';
                 codeHeaders.textContent = JSON.stringify(api.successResponseExample.headers, null, 2);
                 exampleHeadersPre.appendChild(codeHeaders);
                 responseExampleSection.appendChild(exampleHeadersPre);
            }
            if (api.successResponseExample.body) {
                const exampleBodyTitle = document.createElement('h5');
                exampleBodyTitle.textContent = 'Body:';
                responseExampleSection.appendChild(exampleBodyTitle);
                const exampleBodyPre = document.createElement('pre');
                const codeBody = document.createElement('code');
                try {
                    codeBody.textContent = JSON.stringify(JSON.parse(api.successResponseExample.body), null, 2);
                    codeBody.className = 'language-json';
                } catch (e) {
                    codeBody.textContent = api.successResponseExample.body;
                    codeBody.className = (api.successResponseExample.body && (api.successResponseExample.body.trim().startsWith('{') || api.successResponseExample.body.trim().startsWith('['))) ? 'language-json' : 'language-markup';
                }
                exampleBodyPre.appendChild(codeBody);
                responseExampleSection.appendChild(exampleBodyPre);
            }
            contentWrapper.appendChild(responseExampleSection);
        }
        return contentWrapper;
    }

    function isDesktopView() { return window.innerWidth > 768; }

    function renderTryItOutForm(container, api) {
        container.innerHTML = '';
        const formHeader = document.createElement('h4');
        formHeader.textContent = 'Try it out';
        container.appendChild(formHeader);
        const form = document.createElement('form');
        form.dataset.apiId = api.id;
        form.enctype = "multipart/form-data"; 

        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('try-it-out-controls');

        const executeButton = document.createElement('button');
        executeButton.type = 'submit';
        executeButton.classList.add('btn', 'btn-execute');
        const buttonText = document.createElement('span');
        buttonText.classList.add('btn-text');
        buttonText.textContent = 'Execute';
        executeButton.appendChild(buttonText);
        
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.classList.add('btn', 'btn-secondary', 'btn-cancel');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.display = 'none';
        
        const clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.classList.add('btn', 'btn-secondary', 'btn-clear');
        clearButton.textContent = 'Clear';
        clearButton.style.display = 'none';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            executeApiCall(api, form, container, executeButton, cancelButton, clearButton);
        });

        cancelButton.addEventListener('click', () => {
            if (currentApiAbortController) {
                currentApiAbortController.abort();
            }
            buttonText.textContent = 'Execute';
            executeButton.disabled = false;
            cancelButton.style.display = 'none';
            const liveResponseContainer = container.querySelector(`#live-response-${api.id}`);
            if(liveResponseContainer) liveResponseContainer.innerHTML = '<p>Request cancelled by user.</p>';
        });

        clearButton.addEventListener('click', () => {
            form.reset();
            api.parameters?.forEach(param => {
                const inputElement = form.elements[param.name];
                if (inputElement && param.defaultValue !== undefined) {
                    if (inputElement.type === 'checkbox') inputElement.checked = param.defaultValue;
                    else inputElement.value = param.defaultValue;
                } else if (inputElement && inputElement.type === 'checkbox') {
                     inputElement.checked = false;
                }
            });
            const bodyTextarea = form.querySelector('textarea[name="requestBody"]');
            if (bodyTextarea && api.requestBodyExample?.example) {
                bodyTextarea.value = api.requestBodyExample.example;
            }
            const liveResponseContainer = container.querySelector(`#live-response-${api.id}`);
            if(liveResponseContainer) liveResponseContainer.innerHTML = '';
            clearButton.style.display = 'none';
            cancelButton.style.display = 'none';
            executeButton.disabled = false;
            buttonText.textContent = 'Execute';
        });
        
        const parameterInputsContainer = document.createElement('div');
        form.appendChild(parameterInputsContainer);

        if (api.parameters && api.parameters.filter(p => p.in !== 'body').length > 0) {
            api.parameters.filter(p => p.in !== 'body').forEach(param => {
                const group = document.createElement('div'); group.classList.add('form-group');
                const label = document.createElement('label'); label.setAttribute('for', `param-${api.id}-${param.name}`); label.textContent = `${param.name} (${param.in || 'query'})`;
                if (param.required) { const reqSpan = document.createElement('span'); reqSpan.textContent = 'ㅤ*required'; reqSpan.style.color = '#c0392b'; label.appendChild(reqSpan); }
                group.appendChild(label);
                let input;
                switch (param.type) {
                    case 'select':
                        input = document.createElement('select'); input.id = `param-${api.id}-${param.name}`; input.name = param.name;
                        param.options?.forEach(opt => { const option = document.createElement('option'); option.value = opt.value; option.textContent = opt.text; if (opt.value === (param.defaultValue || param.example)) option.selected = true; input.appendChild(option); });
                        break;
                    case 'radio':
                        const radioGroupDiv = document.createElement('div'); radioGroupDiv.classList.add('radio-group');
                        param.options?.forEach(opt => {
                            const radioLabel = document.createElement('label'); const radioInput = document.createElement('input'); radioInput.type = 'radio'; radioInput.id = `param-${api.id}-${param.name}-${opt.value}`; radioInput.name = param.name; radioInput.value = opt.value; if (opt.value === (param.defaultValue || param.example)) radioInput.checked = true;
                            radioLabel.appendChild(radioInput); radioLabel.append(opt.text); radioGroupDiv.appendChild(radioLabel);
                        }); input = radioGroupDiv;
                        break;
                    case 'boolean':
                        const chkContainer = document.createElement('div'); chkContainer.classList.add('checkbox-group'); const chkLabel = document.createElement('label'); input = document.createElement('input'); input.type = 'checkbox'; input.id = `param-${api.id}-${param.name}`; input.name = param.name; input.checked = param.defaultValue === true || param.example === true;
                        chkLabel.appendChild(input); chkLabel.append(param.description || param.name); chkContainer.appendChild(chkLabel); group.replaceChild(chkContainer, label);
                        break;
                    case 'file':
                        input = document.createElement('input'); input.type = 'file'; input.id = `param-${api.id}-${param.name}`; input.name = param.name;
                        if (param.accept) {
                            input.accept = param.accept;
                        }
                        break;
                    default:
                        input = document.createElement('input');
                        input.type = param.type === 'integer' || param.type === 'float' || param.type === 'number' ? 'number' : (param.type === 'url' ? 'url' : (param.type === 'date' ? 'date' : (param.type === 'password' ? 'password' : 'text')));
                        if(param.type === 'float') input.step = 'any';
                        input.id = `param-${api.id}-${param.name}`; input.name = param.name; input.placeholder = param.description;
                        if (param.defaultValue !== undefined) input.value = param.defaultValue;
                        else if (param.example !== undefined) input.value = param.example;
                        if (param.required) input.required = true;
                }
                if(input) group.appendChild(input);
                parameterInputsContainer.appendChild(group);
            });
        }

        const consumes = api.consumes || ['application/json'];
        let selectedContentType = consumes[0];

        if ((api.method === 'POST' || api.method === 'PUT' || api.method === 'PATCH')) {
            if (consumes.length > 1) {
                const contentTypeGroup = document.createElement('div');
                contentTypeGroup.classList.add('form-group', 'content-type-selector-group');
                const contentTypeLabel = document.createElement('label');
                contentTypeLabel.textContent = 'Request Content-Type:';
                contentTypeLabel.setAttribute('for', `content-type-${api.id}`);
                const contentTypeSelect = document.createElement('select');
                contentTypeSelect.id = `content-type-${api.id}`;
                contentTypeSelect.name = 'requestContentType';
                consumes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = type;
                    contentTypeSelect.appendChild(option);
                });
                contentTypeGroup.appendChild(contentTypeLabel);
                contentTypeGroup.appendChild(contentTypeSelect);
                form.insertBefore(contentTypeGroup, parameterInputsContainer.nextSibling);

                contentTypeSelect.addEventListener('change', (e) => {
                    selectedContentType = e.target.value;
                    renderRequestBodyInput(api, form, parameterInputsContainer, selectedContentType);
                });
            }
            renderRequestBodyInput(api, form, parameterInputsContainer, selectedContentType);
        }
        
        controlsDiv.appendChild(executeButton);
        controlsDiv.appendChild(cancelButton);
        controlsDiv.appendChild(clearButton);
        form.appendChild(controlsDiv);
        container.appendChild(form);

        const liveResponseContainer = document.createElement('div'); liveResponseContainer.id = `live-response-${api.id}`; liveResponseContainer.classList.add('response-section'); container.appendChild(liveResponseContainer);
    }

    function renderRequestBodyInput(api, form, parameterInputsContainer, contentType) {
        let requestBodyContainer = form.querySelector('.request-body-group');
        if (requestBodyContainer) {
            requestBodyContainer.remove();
        }
        requestBodyContainer = document.createElement('div');
        requestBodyContainer.classList.add('form-group', 'request-body-group');

        if (contentType === 'application/json' || contentType === 'application/xml' || contentType.startsWith('text/')) {
            const label = document.createElement('label');
            label.setAttribute('for', `body-${api.id}`);
            label.textContent = `Request Body (${contentType})`;
            requestBodyContainer.appendChild(label);
            const textarea = document.createElement('textarea');
            textarea.id = `body-${api.id}`;
            textarea.name = 'requestBody';
            textarea.rows = 8;
            const bodyParam = api.parameters?.find(p => p.in === 'body');
            if (bodyParam?.example) textarea.value = typeof bodyParam.example === 'string' ? bodyParam.example : JSON.stringify(bodyParam.example, null, 2);
            else if (api.requestBodyExample?.example) textarea.value = api.requestBodyExample.example;
            requestBodyContainer.appendChild(textarea);
        } else if (contentType === 'application/x-www-form-urlencoded' || contentType === 'multipart/form-data') {
            const bodyParams = api.parameters?.filter(p => p.in === 'formData' || p.in === 'form');
             if (bodyParams && bodyParams.length > 0) {
                const label = document.createElement('label');
                label.textContent = `Form Data (${contentType})`;
                requestBodyContainer.appendChild(label);

                bodyParams.forEach(param => {
                    const group = document.createElement('div'); group.classList.add('form-group');
                    const paramLabel = document.createElement('label'); paramLabel.setAttribute('for', `param-${api.id}-${param.name}`); paramLabel.textContent = `${param.name}`;
                    if (param.required) { const reqSpan = document.createElement('span'); reqSpan.textContent = 'ㅤ*required'; reqSpan.style.color = '#c0392b'; paramLabel.appendChild(reqSpan); }
                    group.appendChild(paramLabel);
                    let input;
                     switch (param.type) {
                        case 'file':
                            input = document.createElement('input'); input.type = 'file'; input.id = `param-${api.id}-${param.name}`; input.name = param.name;
                            if (param.accept) {
                                input.accept = param.accept;
                            }
                            break;
                        case 'boolean':
                             const chkContainer = document.createElement('div'); chkContainer.classList.add('checkbox-group'); const chkLabel = document.createElement('label'); input = document.createElement('input'); input.type = 'checkbox'; input.id = `param-${api.id}-${param.name}`; input.name = param.name; input.checked = param.defaultValue === true || param.example === true;
                            chkLabel.appendChild(input); chkLabel.append(param.description || param.name); chkContainer.appendChild(chkLabel); group.replaceChild(chkContainer, paramLabel);
                            break;
                        default:
                            input = document.createElement('input');
                            input.type = param.type === 'integer' || param.type === 'float' || param.type === 'number' ? 'number' : (param.type === 'url' ? 'url' : (param.type === 'date' ? 'date' : (param.type === 'password' ? 'password' : 'text')));
                            if(param.type === 'float') input.step = 'any';
                            input.id = `param-${api.id}-${param.name}`; input.name = param.name; input.placeholder = param.description;
                            if (param.defaultValue !== undefined) input.value = param.defaultValue;
                            else if (param.example !== undefined) input.value = param.example;
                            if (param.required) input.required = true;
                    }
                    if (input) group.appendChild(input);
                    requestBodyContainer.appendChild(group);
                });
             }
        }
        form.insertBefore(requestBodyContainer, form.querySelector('.try-it-out-controls'));
    }


    async function makeRequestWithFetchTimeout(method, url, headers, data, responseProcessType, timeoutDuration, signal) {
        const options = { method: method, headers: headers || {}, signal: signal, credentials: 'include' };
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = data;
        }

        const fetchResponse = await fetch(url, options);
        const responseHeaders = {};
        fetchResponse.headers.forEach((value, key) => { responseHeaders[key.toLowerCase()] = value; });
        const originalContentType = responseHeaders['content-type'] || '';
        let responseData;

        if (responseProcessType === 'blob') {
            responseData = await fetchResponse.blob();
        } else {
            const text = await fetchResponse.text();
            if (responseProcessType === 'json' || originalContentType.includes('application/json')) {
                try { responseData = JSON.parse(text); } catch (e) { responseData = text; }
            } else {
                responseData = text;
            }
        }

        if (!fetchResponse.ok) {
            throw { status: fetchResponse.status, statusText: fetchResponse.statusText, response: responseData, headers: responseHeaders, message: `Request to API failed with status ${fetchResponse.status}` };
        }
        return { data: responseData, status: fetchResponse.status, statusText: fetchResponse.statusText, headers: responseHeaders, originalContentType: originalContentType };
    }
    
    async function executeApiCall(api, form, tryItOutContainer, executeButton, cancelButton, clearButton) {
        revokeActiveObjectUrls();
        const liveResponseContainer = tryItOutContainer.querySelector(`#live-response-${api.id}`);
        const buttonText = executeButton.querySelector('.btn-text');
        const originalButtonText = 'Execute';

        buttonText.textContent = 'Loading...';
        executeButton.disabled = true;
        cancelButton.style.display = 'inline-flex';
        clearButton.style.display = 'none';
        liveResponseContainer.innerHTML = '<div class="response-loader"></div>';

        currentApiAbortController = new AbortController();
        const timeoutId = setTimeout(() => {
            if (currentApiAbortController) currentApiAbortController.abort();
        }, REQUEST_TIMEOUT);

        const formData = new FormData(form);
        let targetUrl = selectedApiBaseUrl + api.endpointPath;
        let requestPayload = { method: api.method, headers: {}, data: null };

        api.parameters?.forEach(param => {
            if (param.in === 'path') {
                const value = formData.get(param.name) || param.defaultValue || param.example || '';
                targetUrl = targetUrl.replace(`{${param.name}}`, encodeURIComponent(value));
            } else if (param.in === 'header') {
                const value = formData.get(param.name);
                if (value !== undefined && value !== null && String(value).trim() !== '') {
                    requestPayload.headers[param.name] = value;
                }
            }
        });
        
        let consumesContentType = api.consumes?.[0] || 'application/json';
        const contentTypeSelector = form.querySelector('select[name="requestContentType"]');
        if (contentTypeSelector) {
            consumesContentType = contentTypeSelector.value;
        }


        if (api.method === 'GET' || api.method === 'DELETE') {
            let queryParts = [];
            requestPayload.headers['Accept'] = api.produces?.[0] || 'application/json, text/plain, */*';
            api.parameters?.filter(p => p.in === 'query').forEach(param => {
                let paramValue = param.type === 'boolean' ? form.querySelector(`input[name="${param.name}"]`).checked : formData.get(param.name);
                if (paramValue !== undefined && paramValue !== null && (String(paramValue).length > 0 || param.type === 'boolean')) {
                     queryParts.push(`${encodeURIComponent(param.name)}=${encodeURIComponent(String(paramValue))}`);
                }
            });
            if (queryParts.length > 0) {
                targetUrl += `?${queryParts.join('&')}`;
            }
        } else if (api.method === 'POST' || api.method === 'PUT' || api.method === 'PATCH') {
            requestPayload.headers['Accept'] = api.produces?.[0] || 'application/json';
            
            if (consumesContentType === 'application/json') {
                requestPayload.headers['Content-Type'] = 'application/json';
                const bodyTextarea = form.querySelector('textarea[name="requestBody"]');
                let rawBody = '{}';
                if (bodyTextarea) {
                    rawBody = bodyTextarea.value;
                } else {
                    const bodyObject = api.parameters?.filter(p => p.in === 'body' || p.in === 'formData')
                        .reduce((obj, p) => {
                            if (formData.has(p.name) || p.type === 'boolean') {
                                obj[p.name] = p.type === 'boolean' ? form.querySelector(`input[name="${p.name}"]`).checked :
                                              p.type === 'integer' ? parseInt(formData.get(p.name),10) :
                                              p.type === 'float' || p.type === 'number' ? parseFloat(formData.get(p.name)) : formData.get(p.name);
                            }
                            return obj;
                        }, {});
                     rawBody = JSON.stringify(bodyObject);
                }
                try { JSON.parse(rawBody); requestPayload.data = rawBody; }
                catch (e) {
                    liveResponseContainer.innerHTML = `<p class="response-status status-400">Error: Invalid JSON in request body.</p>`;
                    buttonText.textContent = originalButtonText; executeButton.disabled = false; cancelButton.style.display = 'none'; clearButton.style.display = 'inline-flex'; clearTimeout(timeoutId); return;
                }
            } else if (consumesContentType === 'application/x-www-form-urlencoded') {
                requestPayload.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                const urlEncodedParams = new URLSearchParams();
                api.parameters?.filter(p => p.in === 'formData' || p.in === 'form').forEach(param => {
                     if (formData.has(param.name) || param.type === 'boolean') {
                        urlEncodedParams.append(param.name, param.type === 'boolean' ? form.querySelector(`input[name="${param.name}"]`).checked.toString() : formData.get(param.name));
                    }
                });
                requestPayload.data = urlEncodedParams.toString();
            } else if (consumesContentType === 'multipart/form-data') {
                const multiPartFormData = new FormData();
                 api.parameters?.filter(p => p.in === 'formData' || p.in === 'form').forEach(param => {
                    if (param.type === 'file') {
                        const fileInput = form.querySelector(`input[name="${param.name}"]`);
                        if (fileInput && fileInput.files && fileInput.files.length > 0) {
                            multiPartFormData.append(param.name, fileInput.files[0]);
                        }
                    } else if (formData.has(param.name) || param.type === 'boolean') {
                         multiPartFormData.append(param.name, param.type === 'boolean' ? form.querySelector(`input[name="${param.name}"]`).checked.toString() : formData.get(param.name));
                    }
                });
                requestPayload.data = multiPartFormData;
            } else {
                 requestPayload.headers['Content-Type'] = consumesContentType;
                 const bodyTextarea = form.querySelector('textarea[name="requestBody"]');
                 requestPayload.data = bodyTextarea ? bodyTextarea.value : '';
            }
        }

        let responseWrapper;
        const apiDeclaredContentType = String(api.produces?.[0] || api.successResponseExample?.headers?.['Content-Type'] || '').toLowerCase();
        const isApiMediaRequest = (apiDeclaredContentType.startsWith('image/') || apiDeclaredContentType.startsWith('audio/') || apiDeclaredContentType.startsWith('video/')) && !apiDeclaredContentType.startsWith('image/svg+xml');
        let responseProcessType = isApiMediaRequest ? 'blob' : (apiDeclaredContentType.includes('json') ? 'json' : 'text');

        try {
            responseWrapper = await makeRequestWithFetchTimeout(requestPayload.method, targetUrl, requestPayload.headers, requestPayload.data, responseProcessType, REQUEST_TIMEOUT, currentApiAbortController.signal);
            clearTimeout(timeoutId);
            liveResponseContainer.innerHTML = '';

            const requestUrlDiv = document.createElement('div');
            requestUrlDiv.classList.add('request-url-section');
            requestUrlDiv.style.marginBottom = '10px';
            const requestUrlTitle = document.createElement('h5');
            requestUrlTitle.textContent = 'Request URL:';
            requestUrlDiv.appendChild(requestUrlTitle);
            const requestUrlPre = document.createElement('pre');
            requestUrlPre.style.display = 'flex';
            requestUrlPre.style.alignItems = 'center';
            requestUrlPre.style.justifyContent = 'space-between';
            requestUrlPre.style.paddingTop = '8px';
            requestUrlPre.style.paddingBottom = '8px';
            const requestUrlCode = document.createElement('code');
            requestUrlCode.className = 'language-text';
            requestUrlCode.textContent = targetUrl;
            requestUrlCode.style.whiteSpace = 'nowrap';
            requestUrlCode.style.overflowX = 'auto';
            requestUrlCode.style.display = 'block';
            requestUrlCode.style.flexGrow = '1';
            requestUrlCode.style.minWidth = '0';
            requestUrlPre.appendChild(requestUrlCode);
            const copyUrlButton = document.createElement('button');
            copyUrlButton.textContent = 'Copy URL';
            copyUrlButton.classList.add('btn', 'btn-secondary', 'btn-copy-url');
            copyUrlButton.style.marginLeft = '10px';
            copyUrlButton.style.flexShrink = '0';
            copyUrlButton.style.padding = '3px 6px';
            copyUrlButton.style.fontSize = '0.85em';
            copyUrlButton.addEventListener('click', () => {
                navigator.clipboard.writeText(targetUrl).then(() => {
                    const originalCopyBtnText = copyUrlButton.textContent;
                    copyUrlButton.textContent = 'Copied!';
                    setTimeout(() => { copyUrlButton.textContent = originalCopyBtnText; }, 2000);
                }).catch(err => {
                    console.error('Failed to copy URL: ', err);
                    alert('Failed to copy URL.');
                });
            });
            requestUrlPre.appendChild(copyUrlButton);
            requestUrlDiv.appendChild(requestUrlPre);
            liveResponseContainer.appendChild(requestUrlDiv);

            const statusP = document.createElement('p'); statusP.classList.add('response-status');
            let isAppLevelError = false; let appErrorMessage = 'Failed';
            if (!isApiMediaRequest && typeof responseWrapper.data === 'object' && responseWrapper.data !== null) {
                if (responseWrapper.data.status === false) { isAppLevelError = true; appErrorMessage = responseWrapper.data.message || responseWrapper.data.result || responseWrapper.data.error || 'Application error'; }
                else if (responseWrapper.data.success === false) { isAppLevelError = true; appErrorMessage = responseWrapper.data.message || responseWrapper.data.reason || 'Application error'; }
            }
            statusP.innerHTML = isAppLevelError ? `Status: <span class="status-error-app">${responseWrapper.status} (Application Error: ${appErrorMessage})</span>`
                                             : `Status: <span class="status-${responseWrapper.status}">${responseWrapper.status} ${responseWrapper.statusText || ''}</span>`;
            liveResponseContainer.appendChild(statusP);
            const headersTitle = document.createElement('h5'); headersTitle.textContent = 'Headers:'; liveResponseContainer.appendChild(headersTitle);
            const headersPre = document.createElement('pre'); const codeHeaders = document.createElement('code'); codeHeaders.className = 'language-json'; codeHeaders.textContent = JSON.stringify(responseWrapper.headers, null, 2); headersPre.appendChild(codeHeaders); liveResponseContainer.appendChild(headersPre);

            const bodyTitleElement = document.createElement('h5');
            bodyTitleElement.textContent = 'Body:';
            liveResponseContainer.appendChild(bodyTitleElement);

            let bodyContentToCopy = '';
            const actualContentType = String(responseWrapper.originalContentType || '').toLowerCase();
            let isMediaRenderedAndNotSvg = false;

            if (actualContentType.startsWith('image/svg+xml')) {
                const svgDisplayContainer = document.createElement('div');
                svgDisplayContainer.style.border = '1px solid var(--border-color, #e0e0e0)';
                svgDisplayContainer.style.padding = '10px';
                svgDisplayContainer.style.marginTop = '5px';

                if (typeof responseWrapper.data === 'string') {
                    const svgContentDiv = document.createElement('div');
                    svgContentDiv.innerHTML = responseWrapper.data;
                    if (svgContentDiv.firstChild) {
                        svgContentDiv.firstChild.classList.add('response-media');
                        svgDisplayContainer.appendChild(svgContentDiv.firstChild);
                    } else {
                        svgDisplayContainer.appendChild(document.createTextNode("Received SVG data, but could not parse it."));
                    }
                } else {
                    svgDisplayContainer.appendChild(document.createTextNode("Received SVG data, but it's not in string format."));
                }
                liveResponseContainer.appendChild(svgDisplayContainer);
            } else if (isApiMediaRequest && responseWrapper.data instanceof Blob) {
                const objectURL = URL.createObjectURL(responseWrapper.data);
                activeObjectUrls.push(objectURL);
                let mediaElement;
                if (actualContentType.startsWith('image/')) { mediaElement = document.createElement('img'); mediaElement.alt = 'API Response Image'; }
                else if (actualContentType.startsWith('audio/')) { mediaElement = document.createElement('audio'); mediaElement.controls = true; }
                else if (actualContentType.startsWith('video/')) { mediaElement = document.createElement('video'); mediaElement.controls = true; }
                if (mediaElement) {
                    mediaElement.src = objectURL;
                    mediaElement.classList.add('response-media');
                    liveResponseContainer.appendChild(mediaElement);
                }
                isMediaRenderedAndNotSvg = true;
            }

            if (!actualContentType.startsWith('image/svg+xml') && !isMediaRenderedAndNotSvg) {
                const bodyPre = document.createElement('pre');
                bodyPre.style.marginTop = '5px';

                const codeBody = document.createElement('code');
                if (typeof responseWrapper.data === 'object' && responseWrapper.data !== null) {
                    codeBody.className = 'language-json';
                    bodyContentToCopy = JSON.stringify(responseWrapper.data, null, 2);
                    codeBody.textContent = bodyContentToCopy;
                } else if (typeof responseWrapper.data === 'string') {
                    const originalStringData = responseWrapper.data;
                    bodyContentToCopy = originalStringData;
                    codeBody.textContent = originalStringData;
                    const trimmedData = originalStringData.trim();
                    if ((trimmedData.startsWith('{') && trimmedData.endsWith('}')) || (trimmedData.startsWith('[') && trimmedData.endsWith(']'))) {
                        try {
                            const parsedJson = JSON.parse(trimmedData);
                            bodyContentToCopy = JSON.stringify(parsedJson, null, 2);
                            codeBody.textContent = bodyContentToCopy;
                            codeBody.className = 'language-json';
                        } catch (e) {
                            codeBody.className = actualContentType.includes('html') || actualContentType.includes('xml') ? 'language-markup' : 'language-text';
                        }
                    } else {
                        codeBody.className = actualContentType.includes('html') || actualContentType.includes('xml') ? 'language-markup' : 'language-text';
                    }
                } else if (responseWrapper.data !== undefined && responseWrapper.data !== null) {
                    bodyContentToCopy = String(responseWrapper.data);
                    codeBody.textContent = bodyContentToCopy; codeBody.className = 'language-text';
                } else {
                    bodyContentToCopy = '(Empty Response Body)';
                    codeBody.textContent = bodyContentToCopy; codeBody.className = 'language-text';
                }
                bodyPre.appendChild(codeBody);
                liveResponseContainer.appendChild(bodyPre);
            }

            if (typeof Prism !== 'undefined') Prism.highlightAllUnder(liveResponseContainer);

        } catch (error) {
            clearTimeout(timeoutId);
            liveResponseContainer.innerHTML = '';

            if (error.name === 'AbortError' || (error.message && error.message.includes('aborted'))) {
                 liveResponseContainer.innerHTML = '<p>Request cancelled by user or timed out.</p>';
            } else {
                const requestUrlDiv = document.createElement('div');
                requestUrlDiv.classList.add('request-url-section');
                requestUrlDiv.style.marginBottom = '10px';
                const requestUrlTitle = document.createElement('h5');
                requestUrlTitle.textContent = 'Request URL:';
                requestUrlDiv.appendChild(requestUrlTitle);
                const requestUrlPre = document.createElement('pre');
                requestUrlPre.style.display = 'flex';
                requestUrlPre.style.alignItems = 'center';
                requestUrlPre.style.justifyContent = 'space-between';
                requestUrlPre.style.paddingTop = '8px';
                requestUrlPre.style.paddingBottom = '8px';
                const requestUrlCode = document.createElement('code');
                requestUrlCode.className = 'language-text';
                requestUrlCode.textContent = targetUrl;
                requestUrlCode.style.whiteSpace = 'nowrap';
                requestUrlCode.style.overflowX = 'auto';
                requestUrlCode.style.display = 'block';
                requestUrlCode.style.flexGrow = '1';
                requestUrlCode.style.minWidth = '0';
                requestUrlPre.appendChild(requestUrlCode);
                const copyUrlButton = document.createElement('button');
                copyUrlButton.textContent = 'Copy URL';
                copyUrlButton.classList.add('btn', 'btn-secondary', 'btn-copy-url');
                copyUrlButton.style.marginLeft = '10px';
                copyUrlButton.style.flexShrink = '0';
                copyUrlButton.style.padding = '3px 6px';
                copyUrlButton.style.fontSize = '0.85em';
                copyUrlButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(targetUrl).then(() => {
                        const originalCopyBtnText = copyUrlButton.textContent;
                        copyUrlButton.textContent = 'Copied!';
                        setTimeout(() => { copyUrlButton.textContent = originalCopyBtnText; }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy URL: ', err);
                        alert('Failed to copy URL.');
                    });
                });
                requestUrlPre.appendChild(copyUrlButton);
                requestUrlDiv.appendChild(requestUrlPre);
                liveResponseContainer.appendChild(requestUrlDiv);

                const errorP = document.createElement('p'); errorP.classList.add('response-status');
                let statusClass = `status-${error.status || 'error'}`;
                let errorMsg = error.message || error.statusText || 'Unknown request error';
                if (error.status === 0 && !error.message?.includes('Failed to fetch')) errorMsg = `Network error or CORS issue: ${error.message || 'Could not connect to API server.'}`;
                 else if (error.message?.includes('Failed to fetch')) errorMsg = 'Failed to fetch. This could be a CORS issue, network problem, or the API server is down. Ensure the server is running and has correct CORS headers (e.g., Access-Control-Allow-Origin: *).';


                errorP.innerHTML = `<span class="${statusClass}">${errorMsg} (Status: ${error.status !== undefined ? error.status : 'N/A'})</span>`;
                liveResponseContainer.appendChild(errorP);

                if(error.headers && Object.keys(error.headers).length > 0){ const hTitle = document.createElement('h5'); hTitle.textContent = 'Response Headers:'; liveResponseContainer.appendChild(hTitle); const hPre = document.createElement('pre'); const cHead = document.createElement('code'); cHead.className = 'language-json'; cHead.textContent = JSON.stringify(error.headers, null, 2); hPre.appendChild(cHead); liveResponseContainer.appendChild(hPre); }
                let errorBodyData = error.response || error.data;
                if (errorBodyData) { const bTitle = document.createElement('h5'); bTitle.textContent = 'Response Body:'; liveResponseContainer.appendChild(bTitle); const bPre = document.createElement('pre'); const cBody = document.createElement('code');
                    if (typeof errorBodyData === 'object' && !(errorBodyData instanceof Blob)) { cBody.className = 'language-json'; cBody.textContent = JSON.stringify(errorBodyData, null, 2); }
                    else if (typeof errorBodyData === 'string') { cBody.className = 'language-markup'; cBody.textContent = errorBodyData; }
                    else { cBody.className = 'language-text'; cBody.textContent = '[Non-textual error response]';}
                    bPre.appendChild(cBody); liveResponseContainer.appendChild(bPre); }

                if (typeof Prism !== 'undefined') Prism.highlightAllUnder(liveResponseContainer);
                const addInfo = document.createElement('p'); addInfo.style.marginTop = '10px'; addInfo.innerHTML = `This request was made directly to the API. If the error persists, check the browser console for more details. The target API might be down, the endpoint is incorrect, or there's a network issue. The API server must have correct CORS headers (e.g., <code>Access-Control-Allow-Origin: *</code> or this site's origin) to allow requests from this web page.`;
                liveResponseContainer.appendChild(addInfo);
            }
        } finally {
            clearTimeout(timeoutId);
            currentApiAbortController = null;
            buttonText.textContent = originalButtonText;
            executeButton.disabled = false;
            cancelButton.style.display = 'none';
            clearButton.style.display = 'inline-flex';
        }
    }

    contentSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredApis = allApisForCurrentCategory.filter(api => {
            const titleMatch = api.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = api.description.toLowerCase().includes(searchTerm);
            const serviceMatch = api.service && api.service.toLowerCase().includes(searchTerm);
            let parameterMatch = api.parameters ? api.parameters.some(param => param.name.toLowerCase().includes(searchTerm)) : false;
            return titleMatch || descriptionMatch || serviceMatch || parameterMatch;
        });
        closeCurrentlyOpenApiDetails();
        displayApiEndpoints(filteredApis, '', null);
    });

    hamburgerMenu.addEventListener('click', () => { sidebar.classList.toggle('open'); });
    mainContent.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburgerMenu && !hamburgerMenu.contains(e.target)) {
             sidebar.classList.remove('open');
        }
    });
    window.addEventListener('resize', () => {
        const isCurrentlyDesktop = isDesktopView();
        mainContent.classList.remove('table-view');
        document.querySelectorAll('.api-endpoint-container .endpoint-header').forEach(header => {
            const mainInfo = header.querySelector('.endpoint-header-main-info'); const urlSpan = mainInfo.querySelector('.endpoint-url'); const topLine = mainInfo.querySelector('.endpoint-header-top-line');
            if (urlSpan && topLine && mainInfo.contains(urlSpan) && !topLine.contains(urlSpan)) {
                 mainInfo.insertBefore(urlSpan, topLine.nextSibling);
            }
        });
        if (isDesktopView() && sidebar.classList.contains('open')) { sidebar.classList.remove('open'); }
    });

    renderCategories();
    displayWelcomeMessage();
});