document.addEventListener('DOMContentLoaded', function () {
    const pageContent = document.getElementById('page-content');
    const modalPlaceholder = document.getElementById('modal-placeholder');
    const headerTitle = document.getElementById('header-title');
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    let appData = {
        servicos: [
            { id: 1, nome: 'Cabelo', preco: 'R$ 80,00', status: 'Ativo' },
            { id: 2, nome: 'Maquiagem', preco: 'R$ 250,00', status: 'Ativo' },
            { id: 3, nome: 'Sobrancelha', preco: 'R$ 80,00', status: 'Ativo' },
            { id: 4, nome: 'Manicure', preco: 'R$ 50,00', status: 'Ativo' },
            { id: 5, nome: 'Massagem', preco: 'R$ 70,00', status: 'Ativo' },
        ],
        clientes: [
            { id: 101, nome: 'Ana Paula M.', email: 'anapm@email.com', celular: '(11) 98765-4321', pontos: 1050 },
            { id: 102, nome: 'João Silva', email: 'joao@email.com', celular: '(21) 91234-5678', pontos: 800 },
            { id: 103, nome: 'Maria Rita', email: 'mariar@email.com', celular: '(31) 99876-1234', pontos: 250 },
        ],
        planos: [
            { id: 201, nome: 'Básico', valor: 'R$ 150,00', beneficios: '2 Manicures/mês', status: 'Ativo' },
            { id: 202, nome: 'Premium', valor: 'R$ 300,00', beneficios: '2 Serviços Cabelo, 1 Massagem/mês', status: 'Ativo' },
        ],
        cupons: [
            { id: 301, nome: '20% OFF em Manicure', custo: 200, validade: '2025-12-31', status: 'Ativo' },
            { id: 302, nome: 'Design de Sobrancelha Grátis', custo: 500, validade: '2025-12-31', status: 'Ativo' },
            { id: 303, nome: '50% OFF Limpeza de Pele', custo: 800, validade: '2025-06-30', status: 'Expirado' },
        ],
        agendamentos: [
            { id: 401, cliente: 'Ana Paula M.', servico: 'Manicure', data: '2025-07-25', hora: '10:00', status: 'Confirmado' },
            { id: 402, cliente: 'João Silva', servico: 'Cabelo', data: '2025-07-25', hora: '14:00', status: 'Confirmado' },
            { id: 403, cliente: 'Maria Rita', servico: 'Massagem', data: '2025-07-24', hora: '16:00', status: 'Realizado' },
            { id: 404, cliente: 'Pedro A.', servico: 'Sobrancelha', data: '2025-07-23', hora: '11:00', status: 'Cancelado' }
        ],
        feedbacks: [
            { id: 501, cliente: 'João Souza', servico: 'Cabelo', satisfacao: 'Satisfeito', data: '2025-07-24' },
            { id: 502, cliente: 'Carla Diniz', servico: 'Manicure', satisfacao: 'Insatisfeito', data: '2025-07-23' },
            { id: 503, cliente: 'Fernanda L.', servico: 'Massagem', satisfacao: 'Pouco satisfeito', data: '2025-07-22' }
        ]
    };

    function getDataKeyFromType(type) {
        const mapping = {
            'Serviço': 'servicos', 'Cliente': 'clientes', 'Plano': 'planos',
            'Cupom': 'cupons', 'Agendamento': 'agendamentos', 'Feedback': 'feedbacks'
        };
        return mapping[type];
    }

    function renderContent(pageKey) {
        const container = pageContent.querySelector('.table-wrapper');
        if (!container) return;

        const data = appData[pageKey];
        if (!data) {
            container.innerHTML = "<p>Nenhum dado para exibir nesta seção.</p>";
            return;
        }

        let headers, body;
        switch (pageKey) {
            case 'servicos':
                headers = ['ID', 'Serviço', 'Preço', 'Status', 'Ações'];
                body = data.map(item => `<tr data-id="${item.id}"><td>${String(item.id).padStart(3, '0')}</td><td>${item.nome}</td><td>${item.preco}</td><td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td><td><button title="Editar" class="action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button><button title="Excluir" class="action-btn delete-btn"><i class="fas fa-trash"></i></button></td></tr>`).join('');
                break;
            case 'clientes':
                headers = ['ID', 'Nome Completo', 'E-mail', 'Celular', 'Pontos', 'Ações'];
                body = data.map(item => `<tr data-id="${item.id}"><td>${item.id}</td><td>${item.nome}</td><td>${item.email}</td><td>${item.celular}</td><td>${item.pontos}</td><td><button title="Editar" class="action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button></td></tr>`).join('');
                break;
            case 'planos':
                headers = ['Nome do Plano', 'Valor Mensal', 'Benefícios', 'Status', 'Ações'];
                body = data.map(item => `<tr data-id="${item.id}"><td>${item.nome}</td><td>${item.valor}</td><td>${item.beneficios}</td><td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td><td><button title="Editar" class="action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button><button title="Excluir" class="action-btn delete-btn"><i class="fas fa-trash"></i></button></td></tr>`).join('');
                break;
            case 'cupons':
                headers = ['Nome do Cupom', 'Custo (Pontos)', 'Validade', 'Status', 'Ações'];
                body = data.map(item => `<tr data-id="${item.id}"><td>${item.nome}</td><td>${item.custo}</td><td>${new Date(item.validade + 'T03:00:00Z').toLocaleDateString('pt-BR')}</td><td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td><td><button title="Editar" class="action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button><button title="Excluir" class="action-btn delete-btn"><i class="fas fa-trash"></i></button></td></tr>`).join('');
                break;
            case 'agendamentos':
                headers = ['Cliente', 'Serviço', 'Data', 'Hora', 'Status', 'Ações'];
                body = data.map(item => `<tr data-id="${item.id}"><td>${item.cliente}</td><td>${item.servico}</td><td>${new Date(item.data + 'T03:00:00Z').toLocaleDateString('pt-BR')}</td><td>${item.hora}</td><td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td><td><button title="Editar" class="action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button><button title="Excluir" class="action-btn delete-btn"><i class="fas fa-trash"></i></button></td></tr>`).join('');
                break;
            case 'feedbacks':
                 headers = ['Cliente', 'Serviço', 'Satisfação', 'Data', 'Ações'];
                 body = data.map(item => `<tr data-id="${item.id}"><td>${item.cliente}</td><td>${item.servico}</td><td><span class="status ${item.satisfacao.toLowerCase().replace(' ','-')}">${item.satisfacao}</span></td><td>${new Date(item.data + 'T03:00:00Z').toLocaleDateString('pt-BR')}</td><td><button title="Excluir" class="action-btn delete-btn"><i class="fas fa-trash"></i></button></td></tr>`).join('');
                break;
            default: return;
        }
        container.innerHTML = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table>`;
        attachPageEventListeners();
    }
    
    function closeModal() { const overlay = document.querySelector('.modal-overlay'); if (overlay) { overlay.classList.remove('active'); setTimeout(() => { modalPlaceholder.innerHTML = ''; }, 300); } }
    function createModal(title, content, footer, confirmCallback) {
        modalPlaceholder.innerHTML = `<div class="modal-overlay active"><div class="modal-container"><div class="modal-header"><h2>${title}</h2><button class="modal-close-btn">&times;</button></div><div class="modal-body">${content}</div><div class="modal-footer">${footer}</div></div></div>`;
        const confirmBtn = document.querySelector('.modal-btn.confirm, .modal-btn.delete');
        if (confirmBtn) confirmBtn.addEventListener('click', () => { if (confirmCallback) confirmCallback(); closeModal(); });
        document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        document.querySelector('.modal-btn.cancel').addEventListener('click', closeModal);
    }

    function showAddEditModal(type, itemId = null) {
        const dataKey = getDataKeyFromType(type);
        if (!dataKey) return;
        const dataArray = appData[dataKey];
        const isEdit = itemId !== null;
        const data = isEdit ? dataArray.find(item => item.id === itemId) : {};
        const title = isEdit ? `Editar ${type}` : `Adicionar Novo ${type}`;
        let fields = '';
        switch (type) {
            case 'Serviço': fields = `<div class="form-group"><label>Nome</label><input id="nome" value="${data.nome || ''}"></div><div class="form-group"><label>Preço</label><input id="preco" value="${data.preco || ''}"></div>`; break;
            case 'Cliente': fields = `<div class="form-group"><label>Nome</label><input id="nome" value="${data.nome || ''}"></div><div class="form-group"><label>Email</label><input id="email" type="email" value="${data.email || ''}"></div><div class="form-group"><label>Celular</label><input id="celular" type="tel" value="${data.celular || ''}"></div>`; break;
            case 'Plano': fields = `<div class="form-group"><label>Nome</label><input id="nome" value="${data.nome || ''}"></div><div class="form-group"><label>Valor</label><input id="valor" value="${data.valor || ''}"></div><div class="form-group"><label>Benefícios</label><input id="beneficios" value="${data.beneficios || ''}"></div>`; break;
            case 'Cupom': fields = `<div class="form-group"><label>Nome</label><input id="nome" value="${data.nome || ''}"></div><div class="form-group"><label>Custo</label><input type="number" id="custo" value="${data.custo || ''}"></div><div class="form-group"><label>Validade</label><input type="date" id="validade" value="${data.validade || ''}"></div>`; break;
            case 'Agendamento': fields = `<div class="form-group"><label>Cliente</label><input id="cliente" value="${data.cliente || ''}"></div><div class="form-group"><label>Serviço</label><input id="servico" value="${data.servico || ''}"></div><div class="form-group"><label>Data</label><input type="date" id="data" value="${data.data || ''}"></div><div class="form-group"><label>Hora</label><input type="time" id="hora" value="${data.hora || ''}"></div>`; break;
        }
        const footer = `<button class="modal-btn cancel">Cancelar</button><button class="modal-btn confirm">Salvar</button>`;
        createModal(title, fields, footer, () => {
            const itemToUpdate = isEdit ? data : { id: Date.now(), status: 'Ativo' };
            const formInputs = modalPlaceholder.querySelectorAll('input, select');
            formInputs.forEach(input => { if (input.id in itemToUpdate) itemToUpdate[input.id] = input.value; });
            if (!isEdit) dataArray.push(itemToUpdate);
            renderContent(dataKey);
        });
    }

    function showDeleteModal(type, itemId) {
        const dataKey = getDataKeyFromType(type);
        if (!dataKey) return;
        const dataArray = appData[dataKey];
        const item = dataArray.find(i => i.id === itemId);
        if (!item) return;
        const itemName = item.nome || item.cliente;
        const title = `Confirmar Exclusão`;
        const content = `<div class="confirmation-modal"><div class="icon"><i class="fas fa-exclamation-triangle"></i></div><p>Tem certeza que deseja excluir <strong>${itemName}</strong>?</p></div>`;
        const footer = `<button class="modal-btn cancel">Cancelar</button><button class="modal-btn delete">Sim, Excluir</button>`;
        createModal(title, content, footer, () => { appData[dataKey] = dataArray.filter(i => i.id !== itemId); renderContent(dataKey); });
    }

    let currentChart1, currentChart2;
    function destroyCharts() { if (currentChart1) currentChart1.destroy(); if (currentChart2) currentChart2.destroy(); currentChart1 = null; currentChart2 = null; }
    function initializeDashboardCharts() {
        destroyCharts();
        const agendamentosCtx = document.getElementById('agendamentosChart');
        if (agendamentosCtx) currentChart1 = new Chart(agendamentosCtx, { type: 'bar', data: { labels: ['Manicure', 'Cabelo', 'Massagem', 'Sobrancelha', 'Maquiagem'], datasets: [{ label: 'Agendamentos na Semana', data: [15, 22, 10, 18, 7], backgroundColor: 'rgba(59, 130, 246, 0.7)' }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Agendamentos por Serviço (Semana)' } } } });
        const satisfacaoCtx = document.getElementById('satisfacaoChart');
        if (satisfacaoCtx) currentChart2 = new Chart(satisfacaoCtx, { type: 'doughnut', data: { labels: ['Satisfeitos', 'Pouco Satisfeitos', 'Insatisfeitos'], datasets: [{ label: 'Satisfação', data: [85, 10, 5], backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Satisfação do Cliente' } } } });
    }

    function attachPageEventListeners() {
        const container = pageContent.querySelector('.page-container');
        if (!container || !container.dataset.type) return;
        const type = container.dataset.type;
        container.querySelector('.add-button')?.addEventListener('click', () => showAddEditModal(type));
        container.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', (e) => { const id = parseInt(e.currentTarget.closest('tr').dataset.id); showAddEditModal(type, id); }));
        container.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => { const id = parseInt(e.currentTarget.closest('tr').dataset.id); showDeleteModal(type, id); }));
    }

    function loadPage(page) {
        destroyCharts();
        fetch(`pages/${page}.html`)
            .then(response => response.ok ? response.text() : Promise.reject(`Página ${page}.html não encontrada.`))
            .then(html => {
                pageContent.innerHTML = html;
                const title = page.replace('-', ' ');
                headerTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1);
                if (page === 'dashboard') {
                    initializeDashboardCharts();
                } else {
                    renderContent(page);
                }
            }).catch(error => { console.error('Erro:', error); pageContent.innerHTML = `<p style="color: red; font-weight: bold;">${error}</p>`; });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); const page = this.getAttribute('data-page'); if (!page) return;
            navItems.forEach(item => item.classList.remove('active')); this.parentElement.classList.add('active');
            loadPage(page);
            if (sidebar.classList.contains('active')) sidebar.classList.remove('active');
        });
    });

    menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    
    loadPage('dashboard');
});
