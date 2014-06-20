<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Allenice - {% block title %}{% endblock %}</title>
</head>
<body>

<div class="header">
  {% include 'include/_header.tpl' %}
</div>

<div class="main">
  {% block main %}{% endblock %}
</div>

<div class="footer">
  {% include 'include/_footer.tpl' %}
</div>

</body>
</html>