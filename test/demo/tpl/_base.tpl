<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ site_name }} - {% block title %}{% endblock %}</title>
</head>
<body>
<h1>{{ slogan }}</h1>
<div class="header">
  {% include 'include/_header.tpl' %}
</div>

<div class="main">
  {% block main %}f{% endblock %}
</div>

<div class="footer">
  {% include 'include/_footer.tpl' %}
  <div class="date">{{ now()|date('Y-m-d H:i:s') }}</div>
</div>

</body>
</html>