document.addEventListener('DOMContentLoaded', () => {
    const apiCategoriesList = document.getElementById('apiCategoriesList');
    const apiEndpointsContainer = document.getElementById('apiEndpointsContainer');
    const mainContent = document.getElementById('mainContent');
    const welcomeMessageContainer = document.getElementById('welcomeMessage');
    const searchInput = document.getElementById('searchInput');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const docLinkMainPage = document.getElementById('docLinkMainPage');
    const docLinkInformation = document.getElementById('docLinkInformation');
    const sidebarThemeSwitcher = document.getElementById('sidebarThemeSwitcherSelect');
    const prismThemeLink = document.getElementById('prismTheme');

    let currentOpenCategoryElement = null;
    let userOpenedApiDetailId = null;
    let currentOpenHeaderArrowSpan = null;
    let activeObjectUrls = [];

    const REQUEST_TIMEOUT = 15000;

    const categories = [
      {
        name: "Artificial Intelligence",
        icon: "fas fa-robot",
        apis: [
          {
            id: "openai",
            title: "OpenAI",
            service: "openai",
            description: "Get a reponse from OpenAI.",
            endpoint: "https://vapis.my.id/api/openai",
            method: "GET",
            parameters: [
              { name: "q", type: "string", description: "Ask to openai.", required: true, defaultValue: "Hello, how are you?" }
            ],
            requestBodyExample: null,
            response: {
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: true, result: "Hello! I'm doing well, thank you. How can I assist you today?" }, null, 2)
            }
          },
          {
            id: "claude",
            title: "Claude",
            service: "claude",
            description: "Get a reponse from Claude.",
            endpoint: "https://vapis.my.id/api/claude",
            method: "GET",
            parameters: [
              { name: "q", type: "string", description: "Ask to claude.", required: true, defaultValue: "Hello, how are you?" }
            ],
            requestBodyExample: null,
            response: {
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: true, result: "Hello! I'm doing well, thank you. How can I assist you today?" }, null, 2)
            }
          }
        ]
      },
      {
        name: "Ephoto Maker",
        icon: "fas fa-image",
        apis: [
          {
            id: "glitchtext",
            title: "Glitch Text",
            service: "glitchtext",
            description: "Logo with model Glitch Text.",
            endpoint: "https://vapis.my.id/api/glitchtext",
            method: "GET",
            parameters: [
              { name: "q", type: "string", description: "Send to glitchtext.", required: true, defaultValue: "John Doe" }
            ],
            requestBodyExample: null,
            response: {
              statusCode: 200,
              headers: { "Content-Type": "image/png" },
              body: "image/png"
            }
          },
          {
            id: "writetext",
            title: "Write Text",
            service: "writetext",
            description: "Logo with model Write Text.",
            endpoint: "https://vapis.my.id/api/writetext",
            method: "GET",
            parameters: [
              { name: "q", type: "string", description: "Send to writetext.", required: true, defaultValue: "John Doe" }
            ],
            requestBodyExample: null,
            response: {
              statusCode: 200,
              headers: { "Content-Type": "image/png" },
              body: "image/png"
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
            document.body.classList.add(effectiveBodyClass);
        } else {
            document.body.classList.add('light');
             if (effectiveBodyClass !== 'light-blue') {
                document.body.classList.add(effectiveBodyClass);
             }
        }

        document.documentElement.style.setProperty('--accent-color', accentColorMapping[theme]);
        document.documentElement.style.setProperty('--button-text-color', buttonTextColorMapping[theme]);
        
        if (prismThemeLink.href !== prismThemeMapping[theme]) {
            prismThemeLink.href = prismThemeMapping[theme];
        }
        
        localStorage.setItem('selectedTheme', theme);
        if (sidebarThemeSwitcher.value !== theme) {
            sidebarThemeSwitcher.value = theme;
        }
        
        setTimeout(() => {
            if (typeof Prism !== 'undefined') {
                 Prism.highlightAll();
            }
        }, 50);
    }

    sidebarThemeSwitcher.addEventListener('change', (e) => applyTheme(e.target.value));
    const savedTheme = localStorage.getItem('selectedTheme') || 'light-default';
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
    
    function displayCustomStaticContent(title, htmlContentCallback) {
        closeCurrentlyOpenApiDetails();
        welcomeMessageContainer.style.display = 'none';
        apiEndpointsContainer.innerHTML = `<div class="static-content-wrapper"><h2>${title}</h2>${htmlContentCallback()}</div>`;
        userOpenedApiDetailId = null;
    }

    function displayInformationPage() {
        displayCustomStaticContent("API Information", () => `
            <p>Welcome to <strong>Vioo-APIs</strong>, your central hub for a diverse collection of useful APIs designed to empower your projects. Our mission is to provide reliable and easy-to-use APIs for developers and hobbyists alike.</p>
            <h3>About This Documentation</h3>
            <p>This interactive documentation site was built with modern web technologies to provide a seamless experience:</p>
            <ul>
                <li><strong>Core:</strong> HTML5, CSS3, JavaScript (ES6+)</li>
                <li><strong>API Calls:</strong> Fetch API with AbortController</li>
                <li><strong>Syntax Highlighting:</strong> Prism.js</li>
                <li><strong>Icons:</strong> Font Awesome</li>
            </ul>
            <p>We strive to keep this documentation up-to-date with the latest API changes and features.</p>
            <h3>Contact & Support</h3>
            <p>For any inquiries, support requests, or feedback, please reach out to us through our official channels (details to be provided).</p>
            <ul>
                <li><strong>Version:</strong> 1.0.7</li>
                <li><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
        `);
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
        welcomeMessageContainer.style.display = 'block';
        apiEndpointsContainer.innerHTML = '';
        welcomeMessageContainer.innerHTML = `
            <h2>Welcome to Vioo-APIs</h2>
            <h1>Select an item from the sidebar to explore.</h1>`;
        setActiveDocLink(docLinkMainPage);
    }
    
    function revokeActiveObjectUrls() {
        activeObjectUrls.forEach(url => URL.revokeObjectURL(url));
        activeObjectUrls = [];
    }

    function closeCurrentlyOpenApiDetails() {
        revokeActiveObjectUrls();
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
                if (isDesktopView()) {
                    currentlyOpenContainer.classList.remove('expanded-row');
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
                if (isDesktopView()) containerElement.classList.add('expanded-row');
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
                if (isDesktopView()) containerElement.classList.add('expanded-row');
                if (typeof Prism !== 'undefined') Prism.highlightAllUnder(detailContentDiv);
            }
        }
    }

    function displayApiEndpoints(apisToDisplay, categoryName, singleApiIdToOpen = null) {
        welcomeMessageContainer.style.display = 'none';
        apiEndpointsContainer.innerHTML = '';
        const isTableViewActive = window.innerWidth > 768;
        mainContent.classList.toggle('table-view', isTableViewActive);

        apisToDisplay.forEach(api => {
            const endpointContainer = document.createElement('div');
            endpointContainer.classList.add('api-endpoint-container');
            endpointContainer.dataset.apiId = api.id;
            if (isTableViewActive) endpointContainer.classList.add('view-table');
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
            urlSpan.textContent = api.endpoint;
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
        } else if (apisToDisplay.length === 0) {
            userOpenedApiDetailId = null;
        }
    }

    function createApiDetailContent(api) {
        const contentWrapper = document.createElement('div');
        const descriptionP = document.createElement('p');
        descriptionP.innerHTML = `<strong>Description:</strong> ${api.description}`;
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
            paramsThead.innerHTML = `<tr><th>Name</th><th>Type</th><th>Description</th><th>Required</th></tr>`;
            paramsTable.appendChild(paramsThead);
            const paramsTbody = document.createElement('tbody');
            api.parameters.forEach(param => {
                const row = paramsTbody.insertRow();
                row.insertCell().textContent = param.name;
                const typeCell = row.insertCell();
                const typeSpan = document.createElement('span');
                typeSpan.classList.add('param-type');
                typeSpan.textContent = param.type;
                typeCell.appendChild(typeSpan);
                row.insertCell().textContent = param.description;
                const requiredCell = row.insertCell();
                const requiredSpan = document.createElement('span');
                if (param.required) { requiredSpan.textContent = 'Yes'; requiredSpan.classList.add('required'); }
                else { requiredSpan.textContent = 'No'; }
                requiredCell.appendChild(requiredSpan);
            });
            paramsTable.appendChild(paramsTbody);
            contentWrapper.appendChild(paramsTable);
        }
        const tryItOutSection = document.createElement('div');
        tryItOutSection.classList.add('try-it-out-section');
        tryItOutSection.id = `try-${api.id}`;
        contentWrapper.appendChild(tryItOutSection);
        renderTryItOutForm(tryItOutSection, api);
        const responseSection = document.createElement('div');
        responseSection.classList.add('response-section');
        responseSection.id = `response-${api.id}`;
        const responseExampleHeader = document.createElement('h4');
        responseExampleHeader.textContent = 'Example Response';
        responseSection.appendChild(responseExampleHeader);
        const exampleStatus = document.createElement('p');
        exampleStatus.classList.add('response-status');
        exampleStatus.innerHTML = `Status: <span class="status-${api.response.statusCode}">${api.response.statusCode}</span>`;
        responseSection.appendChild(exampleStatus);
        if (api.response.headers) {
             const exampleHeadersTitle = document.createElement('h5');
             exampleHeadersTitle.textContent = 'Headers:';
             responseSection.appendChild(exampleHeadersTitle);
             const exampleHeadersPre = document.createElement('pre');
             const codeHeaders = document.createElement('code');
             codeHeaders.className = 'language-json';
             codeHeaders.textContent = JSON.stringify(api.response.headers, null, 2);
             exampleHeadersPre.appendChild(codeHeaders);
             responseSection.appendChild(exampleHeadersPre);
        }
        const exampleBodyTitle = document.createElement('h5');
        exampleBodyTitle.textContent = 'Body:';
        responseSection.appendChild(exampleBodyTitle);
        const exampleBodyPre = document.createElement('pre');
        const codeBody = document.createElement('code');
        try {
            codeBody.textContent = JSON.stringify(JSON.parse(api.response.body), null, 2);
            codeBody.className = 'language-json';
        } catch (e) {
            codeBody.textContent = api.response.body;
            codeBody.className = (api.response.body && (api.response.body.trim().startsWith('{') || api.response.body.trim().startsWith('['))) ? 'language-json' : 'language-markup';
        }
        exampleBodyPre.appendChild(codeBody);
        responseSection.appendChild(exampleBodyPre);
        contentWrapper.appendChild(responseSection);
        return contentWrapper;
    }

    function isDesktopView() { return window.innerWidth > 768; }

    function renderTryItOutForm(container, api) {
        container.innerHTML = '';
        const formHeader = document.createElement('h4');
        formHeader.textContent = 'Try it out';
        container.appendChild(formHeader);
        const form = document.createElement('form');
        const executeButton = document.createElement('button');
        executeButton.type = 'submit';
        executeButton.classList.add('btn', 'btn-execute');
        const buttonText = document.createElement('span');
        buttonText.classList.add('btn-text');
        buttonText.textContent = 'Execute';
        executeButton.appendChild(buttonText);
        form.addEventListener('submit', (e) => { e.preventDefault(); executeApiCall(api, form, container, executeButton); });
        if (api.parameters && api.parameters.length > 0) {
            api.parameters.forEach(param => {
                const group = document.createElement('div'); group.classList.add('form-group');
                const label = document.createElement('label'); label.setAttribute('for', `param-${api.id}-${param.name}`); label.textContent = `${param.name} (${param.type})`;
                if (param.required) { const reqSpan = document.createElement('span'); reqSpan.textContent = ' *required'; reqSpan.style.color = '#c0392b'; label.appendChild(reqSpan); }
                const descSpan = document.createElement('span'); descSpan.classList.add('param-description'); descSpan.textContent = `- ${param.description}`; label.appendChild(descSpan);
                group.appendChild(label);
                if (param.type === 'select') {
                    const select = document.createElement('select'); select.id = `param-${api.id}-${param.name}`; select.name = param.name;
                    param.options.forEach(opt => { const option = document.createElement('option'); option.value = opt.value; option.textContent = opt.text; if (opt.value === param.defaultValue) option.selected = true; select.appendChild(option); });
                    group.appendChild(select);
                } else if (param.type === 'radio') {
                    const radioGroupDiv = document.createElement('div'); radioGroupDiv.classList.add('radio-group');
                    param.options.forEach(opt => {
                        const radioLabel = document.createElement('label'); const radioInput = document.createElement('input'); radioInput.type = 'radio'; radioInput.id = `param-${api.id}-${param.name}-${opt.value}`; radioInput.name = param.name; radioInput.value = opt.value; if (opt.value === param.defaultValue) radioInput.checked = true;
                        radioLabel.appendChild(radioInput); radioLabel.append(opt.text); radioGroupDiv.appendChild(radioLabel);
                    }); group.appendChild(radioGroupDiv);
                } else if (param.type === 'checkbox') {
                    const chkContainer = document.createElement('div'); chkContainer.classList.add('checkbox-group'); const chkLabel = document.createElement('label'); const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.id = `param-${api.id}-${param.name}`; checkbox.name = param.name; checkbox.checked = param.defaultValue === true;
                    chkLabel.appendChild(checkbox); chkLabel.append(param.description || param.name); chkContainer.appendChild(chkLabel); group.appendChild(chkContainer); group.replaceChild(chkContainer, label);
                } else {
                    const input = document.createElement('input'); input.type = param.type === 'integer' || param.type === 'float' ? 'number' : 'text'; if(param.type === 'float') input.step = 'any'; input.id = `param-${api.id}-${param.name}`; input.name = param.name; input.placeholder = param.description; if (param.defaultValue !== undefined) input.value = param.defaultValue; if (param.required) input.required = true;
                    group.appendChild(input);
                } form.appendChild(group);
            });
        }
        if ((api.method === 'POST' || api.method === 'PUT' || api.method === 'PATCH') && api.requestBodyExample) {
            const group = document.createElement('div'); group.classList.add('form-group'); const label = document.createElement('label'); label.setAttribute('for', `body-${api.id}`); label.textContent = `Request Body (${api.requestBodyExample.contentType})`; group.appendChild(label);
            const textarea = document.createElement('textarea'); textarea.id = `body-${api.id}`; textarea.name = 'requestBody'; textarea.rows = 8; textarea.value = api.requestBodyExample.example; group.appendChild(textarea);
            form.appendChild(group);
        }
        form.appendChild(executeButton); container.appendChild(form);
        const liveResponseContainer = document.createElement('div'); liveResponseContainer.id = `live-response-${api.id}`; liveResponseContainer.classList.add('response-section'); container.appendChild(liveResponseContainer);
    }

    async function makeRequestWithFetchTimeout(method, url, headers, data, responseProcessType, timeoutDuration) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        const options = { method: method, headers: headers || {}, signal: controller.signal, credentials: 'include' };
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            options.body = data;
        }

        try {
            const fetchResponse = await fetch(url, options);
            clearTimeout(timeoutId);

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
                throw { status: fetchResponse.status, statusText: fetchResponse.statusText, response: responseData, headers: responseHeaders, message: `Request failed with status ${fetchResponse.status}` };
            }
            return { data: responseData, status: fetchResponse.status, statusText: fetchResponse.statusText, headers: responseHeaders, originalContentType: originalContentType };
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw { status: 0, statusText: 'Request Timeout (Fetch)', response: null, message: 'Request Timeout. The server did not respond in time.' };
            }
            if (error.status !== undefined) throw error;
            throw { status: 0, statusText: 'Network Error or CORS issue (Fetch)', response: null, message: error.message || 'Network Error or CORS issue. The API server may not be configured for Cross-Origin Requests from this origin, or there is a network connectivity problem.' };
        }
    }


    async function executeApiCall(api, form, tryItOutContainer, buttonElement) {
        revokeActiveObjectUrls();
        const liveResponseContainer = tryItOutContainer.querySelector(`#live-response-${api.id}`);
        const buttonTextElement = buttonElement.querySelector('.btn-text');
        const originalButtonText = buttonTextElement.textContent;
        
        buttonTextElement.textContent = 'Loading...';
        buttonElement.disabled = true;
        liveResponseContainer.innerHTML = '<div class="response-loader"></div>';

        const formData = new FormData(form);
        let targetUrl = api.endpoint;
        let requestPayload = { method: api.method, headers: {}, data: null };

        if (api.method === 'GET' || api.method === 'DELETE') {
            const queryParams = new URLSearchParams();
            requestPayload.headers['Accept'] = 'application/json, text/plain, */*';
            api.parameters.forEach(param => {
                let paramValue = param.type === 'checkbox' ? form.querySelector(`input[name="${param.name}"]`).checked : formData.get(param.name);
                if (paramValue !== undefined && paramValue !== null && (String(paramValue).length > 0 || param.type === 'checkbox')) {
                     queryParams.append(param.name, paramValue);
                }
            });
            if (queryParams.toString()) targetUrl += `?${queryParams.toString()}`;
        } else if (api.method === 'POST' || api.method === 'PUT' || api.method === 'PATCH') {
            const contentType = (api.requestBodyExample && api.requestBodyExample.contentType) || 'application/json';
            requestPayload.headers['Content-Type'] = contentType;
            if (contentType === 'application/json') {
                const bodyTextarea = form.querySelector('textarea[name="requestBody"]');
                let rawBody;
                if (bodyTextarea) {
                    rawBody = bodyTextarea.value;
                } else {
                    const bodyObject = api.parameters.reduce((obj, p) => {
                        if (formData.has(p.name) || p.type === 'checkbox') {
                            obj[p.name] = p.type === 'checkbox' ? form.querySelector(`input[name="${p.name}"]`).checked :
                                          p.type === 'integer' ? parseInt(formData.get(p.name),10) :
                                          p.type === 'float' ? parseFloat(formData.get(p.name)) : formData.get(p.name);
                        }
                        return obj;
                    }, {});
                    rawBody = JSON.stringify(bodyObject);
                }
                try { JSON.parse(rawBody); requestPayload.data = rawBody; }
                catch (e) {
                    liveResponseContainer.innerHTML = `<p class="response-status status-400">Error: Invalid JSON in request body.</p>`;
                    buttonTextElement.textContent = originalButtonText; buttonElement.disabled = false; return;
                }
            } else {
                const urlEncodedParams = new URLSearchParams();
                api.parameters.forEach(param => {
                     if (formData.has(param.name) || param.type === 'checkbox') {
                        urlEncodedParams.append(param.name, param.type === 'checkbox' ? form.querySelector(`input[name="${param.name}"]`).checked.toString() : formData.get(param.name));
                    }
                });
                requestPayload.data = urlEncodedParams.toString();
            }
        }
        
        let responseWrapper;
        const apiDeclaredContentType = String(api.response.headers['Content-Type'] || '').toLowerCase();
        const isMediaRequest = (apiDeclaredContentType.startsWith('image/') || apiDeclaredContentType.startsWith('audio/') || apiDeclaredContentType.startsWith('video/')) && !apiDeclaredContentType.startsWith('image/svg+xml');
        let responseProcessType = isMediaRequest ? 'blob' : (apiDeclaredContentType.includes('json') ? 'json' : 'text');

        try {
            responseWrapper = await makeRequestWithFetchTimeout(requestPayload.method, targetUrl, requestPayload.headers, requestPayload.data, responseProcessType, REQUEST_TIMEOUT);

            liveResponseContainer.innerHTML = '';
            const statusP = document.createElement('p'); statusP.classList.add('response-status');
            let isAppLevelError = false; let appErrorMessage = 'Failed';
            if (!isMediaRequest && typeof responseWrapper.data === 'object' && responseWrapper.data !== null) {
                if (responseWrapper.data.status === false) { isAppLevelError = true; appErrorMessage = responseWrapper.data.message || responseWrapper.data.result || responseWrapper.data.error || 'Application error'; }
                else if (responseWrapper.data.success === false) { isAppLevelError = true; appErrorMessage = responseWrapper.data.message || responseWrapper.data.reason || 'Application error'; }
            }
            statusP.innerHTML = isAppLevelError ? `Status: <span class="status-error-app">${responseWrapper.status} (Application Error: ${appErrorMessage})</span>`
                                             : `Status: <span class="status-${responseWrapper.status}">${responseWrapper.status} ${responseWrapper.statusText || ''}</span>`;
            liveResponseContainer.appendChild(statusP);
            const headersTitle = document.createElement('h5'); headersTitle.textContent = 'Headers:'; liveResponseContainer.appendChild(headersTitle);
            const headersPre = document.createElement('pre'); const codeHeaders = document.createElement('code'); codeHeaders.className = 'language-json'; codeHeaders.textContent = JSON.stringify(responseWrapper.headers, null, 2); headersPre.appendChild(codeHeaders); liveResponseContainer.appendChild(headersPre);
            const bodyTitle = document.createElement('h5'); bodyTitle.textContent = 'Body:'; liveResponseContainer.appendChild(bodyTitle);
            
            const actualContentType = String(responseWrapper.originalContentType || '').toLowerCase();
            let isMediaRendered = false;

            if (actualContentType.startsWith('image/svg+xml')) {
                if (typeof responseWrapper.data === 'string') {
                    const svgContainer = document.createElement('div'); svgContainer.innerHTML = responseWrapper.data;
                    if (svgContainer.firstChild) { svgContainer.firstChild.classList.add('response-media'); liveResponseContainer.appendChild(svgContainer.firstChild); }
                    else { liveResponseContainer.appendChild(document.createTextNode("Received SVG data, but could not parse it.")); }
                } else { liveResponseContainer.appendChild(document.createTextNode("Received SVG data, but it's not in string format.")); }
                isMediaRendered = true;
            } else if (isMediaRequest && responseWrapper.data instanceof Blob) {
                const objectURL = URL.createObjectURL(responseWrapper.data);
                activeObjectUrls.push(objectURL);
                let mediaElement;
                if (actualContentType.startsWith('image/')) { mediaElement = document.createElement('img'); mediaElement.alt = 'API Response Image'; }
                else if (actualContentType.startsWith('audio/')) { mediaElement = document.createElement('audio'); mediaElement.controls = true; }
                else if (actualContentType.startsWith('video/')) { mediaElement = document.createElement('video'); mediaElement.controls = true; }
                if (mediaElement) { mediaElement.src = objectURL; mediaElement.classList.add('response-media'); liveResponseContainer.appendChild(mediaElement); }
                isMediaRendered = true;
            }

            if (!isMediaRendered) {
                const bodyPre = document.createElement('pre'); const codeBody = document.createElement('code');
                if (typeof responseWrapper.data === 'object' && responseWrapper.data !== null) {
                    codeBody.className = 'language-json'; codeBody.textContent = JSON.stringify(responseWrapper.data, null, 2);
                } else if (typeof responseWrapper.data === 'string') {
                    codeBody.textContent = responseWrapper.data; const trimmedData = responseWrapper.data.trim();
                    if ((trimmedData.startsWith('{') && trimmedData.endsWith('}')) || (trimmedData.startsWith('[') && trimmedData.endsWith(']'))) {
                        try { codeBody.textContent = JSON.stringify(JSON.parse(trimmedData), null, 2); codeBody.className = 'language-json'; }
                        catch (e) { codeBody.className = actualContentType.includes('html') || actualContentType.includes('xml') ? 'language-markup' : 'language-text'; }
                    } else { codeBody.className = actualContentType.includes('html') || actualContentType.includes('xml') ? 'language-markup' : 'language-text'; }
                } else if (responseWrapper.data !== undefined && responseWrapper.data !== null) {
                    codeBody.textContent = String(responseWrapper.data); codeBody.className = 'language-text';
                } else { codeBody.textContent = '(Empty Response Body)'; codeBody.className = 'language-text'; }
                bodyPre.appendChild(codeBody); liveResponseContainer.appendChild(bodyPre);
            }
            if (typeof Prism !== 'undefined') Prism.highlightAllUnder(liveResponseContainer);

        } catch (error) {
            liveResponseContainer.innerHTML = ''; const errorP = document.createElement('p'); errorP.classList.add('response-status');
            let statusClass = `status-${error.status || 'error'}`;
            let errorMsg = error.message || error.statusText || 'Unknown request error';
            if (error.status === 0) errorMsg = error.message; 

            errorP.innerHTML = `<span class="${statusClass}">${errorMsg} (Status: ${error.status !== undefined ? error.status : 'N/A'})</span>`;
            liveResponseContainer.appendChild(errorP);
            
            if(error.headers && Object.keys(error.headers).length > 0){ const hTitle = document.createElement('h5'); hTitle.textContent = 'Response Headers:'; liveResponseContainer.appendChild(hTitle); const hPre = document.createElement('pre'); const cHead = document.createElement('code'); cHead.className = 'language-json'; cHead.textContent = JSON.stringify(error.headers, null, 2); hPre.appendChild(cHead); liveResponseContainer.appendChild(hPre); }
            let errorBodyData = error.response || error.data; // error.response is where fetch !ok body is stored
            if (errorBodyData) { const bTitle = document.createElement('h5'); bTitle.textContent = 'Response Body:'; liveResponseContainer.appendChild(bTitle); const bPre = document.createElement('pre'); const cBody = document.createElement('code');
                if (typeof errorBodyData === 'object' && !(errorBodyData instanceof Blob)) { cBody.className = 'language-json'; cBody.textContent = JSON.stringify(errorBodyData, null, 2); }
                else if (typeof errorBodyData === 'string') { cBody.className = 'language-markup'; cBody.textContent = errorBodyData; }
                else { cBody.className = 'language-text'; cBody.textContent = '[Non-textual error response]';}
                bPre.appendChild(cBody); liveResponseContainer.appendChild(bPre); }
            
            if (typeof Prism !== 'undefined') Prism.highlightAllUnder(liveResponseContainer);
            const addInfo = document.createElement('p'); addInfo.style.marginTop = '10px'; addInfo.innerHTML = `This request was made directly to the API. If the error persists, the target API might be down, the endpoint is incorrect, or there's a network issue. The API server must have correct CORS headers (e.g., <code>Access-Control-Allow-Origin: *</code> or this site's origin) to allow requests from this web page.`;
            liveResponseContainer.appendChild(addInfo);
        } finally {
            buttonTextElement.textContent = originalButtonText; buttonElement.disabled = false;
        }
    }

    function filterAPIs(searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        closeCurrentlyOpenApiDetails();
        if (!lowerSearchTerm) {
            if (currentOpenCategoryElement) {
                 const categoryName = currentOpenCategoryElement.querySelector('.category-text-content').textContent.trim();
                 const category = categories.find(cat => cat.name === categoryName);
                 if (category) displayApiEndpoints(category.apis, category.name, null);
            } else if (docLinkMainPage.classList.contains('active')) { displayWelcomeMessage(); }
            else if (docLinkInformation.classList.contains('active')) { displayInformationPage(); }
            else { displayWelcomeMessage(); }
            return;
        }
        const filteredApis = [];
        categories.forEach(category => {
            category.apis.forEach(api => {
                const titleMatch = api.title.toLowerCase().includes(lowerSearchTerm);
                const descriptionMatch = api.description.toLowerCase().includes(lowerSearchTerm);
                const serviceMatch = api.service && api.service.toLowerCase().includes(lowerSearchTerm);
                let parameterMatch = api.parameters ? api.parameters.some(param => param.name.toLowerCase().includes(lowerSearchTerm)) : false;
                if (titleMatch || descriptionMatch || serviceMatch || parameterMatch) {
                    if (!filteredApis.find(existingApi => existingApi.id === api.id)) { filteredApis.push({...api, categoryName: category.name}); }
                }
            });
        });
        if (filteredApis.length > 0) {
            welcomeMessageContainer.style.display = 'none'; apiEndpointsContainer.innerHTML = ''; setActiveDocLink(null);
            if (currentOpenCategoryElement) {
                currentOpenCategoryElement.classList.remove('active'); const list = currentOpenCategoryElement.nextElementSibling; if (list) list.classList.remove('expanded');
                updateArrow(currentOpenCategoryElement.querySelector('.arrow'), false); currentOpenCategoryElement = null;
            }
            document.querySelectorAll('.sidebar .api-list a.active-endpoint').forEach(link => link.classList.remove('active-endpoint'));
            displayApiEndpoints(filteredApis, "Search Results", null);
        } else {
            welcomeMessageContainer.style.display = 'none'; apiEndpointsContainer.innerHTML = '<p style="text-align:center; padding:20px;">No APIs found matching your search criteria.</p>'; setActiveDocLink(null);
        }
    }

    searchInput.addEventListener('input', (e) => filterAPIs(e.target.value));
    hamburgerMenu.addEventListener('click', () => { sidebar.classList.toggle('open'); });
    mainContent.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburgerMenu && !hamburgerMenu.contains(e.target)) {
             sidebar.classList.remove('open');
        }
    });
    window.addEventListener('resize', () => {
        const isCurrentlyDesktop = isDesktopView(); mainContent.classList.toggle('table-view', isCurrentlyDesktop);
        document.querySelectorAll('.api-endpoint-container .endpoint-header').forEach(header => {
            const mainInfo = header.querySelector('.endpoint-header-main-info'); const urlSpan = mainInfo.querySelector('.endpoint-url'); const topLine = mainInfo.querySelector('.endpoint-header-top-line');
            if (urlSpan && topLine) {
                if (isDesktopView() && !topLine.contains(urlSpan)) { topLine.appendChild(urlSpan); urlSpan.style.marginTop = '0'; urlSpan.style.width = 'auto'; urlSpan.style.display = 'inline-block'; }
                else if (!isDesktopView() && topLine.contains(urlSpan)) { mainInfo.appendChild(urlSpan); urlSpan.style.marginTop = '5px'; urlSpan.style.width = '100%'; urlSpan.style.display = 'block'; }
            }
        });
        if (isDesktopView() && sidebar.classList.contains('open')) { sidebar.classList.remove('open'); }
    });
    
    renderCategories();
    displayWelcomeMessage();
});