class BaseTableFactory {
    constructor({ model, baseRoute, columns, viewName }) {
      if (!model || !baseRoute || !columns || !viewName) {
        throw new Error('Faltan argumentos requeridos en el constructor');
      }
  
      this.model = model;
      this.baseRoute = baseRoute;
      this.columns = columns;
      this.viewName = viewName;
    }
  
    async getPaginatedData(page, limit) {
      const total = await this.model.countDocuments();
      const data = await this.model.find()
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      console.log(data)

      return { data, total };
    }
  
    async render(req, res) {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const { data, total } = await this.getPaginatedData(page, limit);
      const totalPages = Math.ceil(total / limit);
    
     if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
        return res.json({
          data,
          columns: this.columns,
          currentPage: page,
          totalPages,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPages
        });
      }

      res.render(this.viewName, {
        data,
        columns: this.columns,
        currentPage: page,
        totalPages,
        BaseRoute: this.baseRoute
      });
    }
    
  }
  
  module.exports = BaseTableFactory;
  